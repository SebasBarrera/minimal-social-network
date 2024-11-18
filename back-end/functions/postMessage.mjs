import AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function handler(event) {
    const body = JSON.parse(event.body);
    const message = body.message;

    const userId = event.requestContext.authorizer.claims.sub;
    const userEmail = event.requestContext.authorizer.claims.email;

    const params = {
        TableName: 'Messages',
        Item: {
            messageId: `${userId}-${Date.now()}`,
            userId: userId,
            userEmail: userEmail,
            message: message,
            timestamp: new Date().toISOString()
        }
    };

    try {
        await dynamoDb.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ status: 'Mensaje publicado' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'No se pudo publicar el mensaje' })
        };
    }
}

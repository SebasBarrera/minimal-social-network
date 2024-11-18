import AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function handler(event) {
    const params = {
        TableName: 'Messages'
    };

    try {
        const data = await dynamoDb.scan(params).promise();
        const messages = data.Items.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        return {
            statusCode: 200,
            body: JSON.stringify(messages)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'No se pudieron obtener los mensajes' })
        };
    }
}

import AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function handler(event) {
    const { eventType, connectionId } = event.requestContext;

    if (eventType === 'CONNECT') {
        const params = {
            TableName: 'Connections',
            Item: {
                connectionId: connectionId
            }
        };
        await dynamoDb.put(params).promise();
    } else if (eventType === 'DISCONNECT') {
        const params = {
            TableName: 'Connections',
            Key: {
                connectionId: connectionId
            }
        };
        await dynamoDb.delete(params).promise();
    }

    return {
        statusCode: 200,
        body: 'Conexión manejada'
    };
}

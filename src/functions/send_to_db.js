const { app } = require('@azure/functions');
import { connectAndQuery } from "../../db/connectAndQuery"

//https://learn.microsoft.com/en-us/azure/azure-sql/database/connect-query-nodejs?view=azuresql&tabs=macos

app.http('send_to_db', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const req_query = request.query.text()

        console.log("Starting...");
        await connectAndQuery(req_query);
    }
});
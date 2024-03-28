const { app } = require('@azure/functions');
const { BlockBlobClient } = require("@azure/storage-blob");
const { DefaultAzureCredential } = require('@azure/identity');
const fs = require('fs');



app.http('httpTrigger1', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);


        var body = await request.text() || { "data": "", "file": "" }
        body = JSON.parse(body)

        const timeStamp = Date.now();
        const content = body["data"]
        const fileName = `${timeStamp}_${body["file"]}.txt`;
        const filePath = `./files/${fileName}`

        fs.writeFile(file = filePath, data = content, (err) => err && console.error(err))

        /* 
        const accountName = "exxeta" // process.env.AZURE_STORAGE_ACCOUNT_NAME;
        if (!accountName) throw Error("Azure Storage accountName not found");

        const baseUrl = `https://${accountName}.blob.core.windows.net`;

        const containerName = `test`;

        async function main() {

            const client = new BlockBlobClient(
                `${baseUrl}/${containerName}/${fileName}`,
                new DefaultAzureCredential()
            );

            console.log(`blob.url: ${client.url}`);

            const result1 = await client.upload(content, content.length);
            const result2 = await client.uploadFile(filePath)

            return result1;
        }

        main().then((result) => console.log(result)).catch((ex) => console.log(ex.message));
        */
    }
});



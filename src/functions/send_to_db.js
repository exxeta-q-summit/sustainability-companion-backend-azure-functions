const { app } = require('@azure/functions');
const sql = require('mssql');

//https://learn.microsoft.com/en-us/azure/azure-sql/database/connect-query-nodejs?view=azuresql&tabs=macos

app.http('send_to_db', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const config = {
            user: 'username', //process.env.DB_USER
            password: 'password', //process.env.DB_PASSWORD
            server: 'your_server.database.windows.net', //process.env.DB_SERVER
            port: 1433, // optional, defaults to 1433, process.env.DB_PORT
            database: 'AdventureWorksLT', //process.env.DB_NAME
            authentication: {
                type: 'default'
            },
            options: {
                encrypt: true
            }
        }


        console.log("Starting...");
        connectAndQuery();

        async function connectAndQuery() {
            try {
                var poolConnection = await sql.connect(config);

                console.log("Reading rows from the Table...");
                var resultSet = await poolConnection.request().query(`SELECT TOP 20 pc.Name as CategoryName,
                    p.name as ProductName 
                    FROM [SalesLT].[ProductCategory] pc
                    JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid`);

                console.log(`${resultSet.recordset.length} rows returned.`);

                var columns = "";
                for (var column in resultSet.recordset.columns) {
                    columns += column + ", ";
                }
                console.log("%s\t", columns.substring(0, columns.length - 2));

                resultSet.recordset.forEach(row => {
                    console.log("%s\t%s", row.CategoryName, row.ProductName);
                });

                poolConnection.close();
            } catch (err) {
                console.error(err.message);
            }
        }


    }
});

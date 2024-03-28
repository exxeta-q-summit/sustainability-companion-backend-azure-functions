const sql = require('mssql');
// const sql = require('mongodb'); 

async function connectAndQuery(req_query) {
    try {
        var poolConnection = await sql.connect(config);

        console.log("Reading rows from the Table...");
        var resultSet = await poolConnection.request().query(req_query);

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
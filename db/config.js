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
const config = {
    user: 'rodolfogregorio',
    password: 'Access@bank',
    server: 'abankserver.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'accessbank',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}

module.exports = config;
const config = {
   
    user: 'accessbank',
    password: '',
    server: 'accessbankb.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'accessbank',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}

module.exports = config;
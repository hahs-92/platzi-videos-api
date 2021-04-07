require('dotenv').config()

const config = {
    dev: process.env.NODE_ENV.trim() !== 'production',
    port: process.env.NODE_PORT || 3006,

    //CONFIG
    cors: process.env.CORS,

    //MONGO
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME
}

module.exports = { config }
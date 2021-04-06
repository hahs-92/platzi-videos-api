require('dotenv').config()

const config = {
    dev: process.env.NODE_ENV.trim() !== 'production',
    port: process.env.NODE_PORT || 3006,

    //CONFIG
    cors: process.env.CORS,

    //MONGO
    dbUser: process.env.BD_USER,
    dbPassword: process.env.BD_PASSWORD,
    dbName: process.env.BD_NAME
}

module.exports = { config }
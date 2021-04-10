require('dotenv').config()

const config = {
    // dev: process.env.NODE_ENV.trim() !== 'production',
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.NODE_PORT || 3006,

    //CONFIG
    cors: process.env.CORS,

    //MONGO
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,

    //JWT SECRET
    authJwtSecret: process.env.AUTH_JWT_SECRET,

    //USERS
    defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
    defaultUserPassword: process.env.DEFAULT_USER_PASSWORD,

    //AUTH
    authJwtSecret: process.env.AUTH_JWT_SECRET,

    //API KEYS
    publicApiKeyToken: process.env.UBLIC_API_KEY_TOKEN,
    adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN
}

module.exports = { config }
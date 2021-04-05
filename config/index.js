require('dotenv').config()

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.NODE_PORT || 3006
}

module.exports = { config }
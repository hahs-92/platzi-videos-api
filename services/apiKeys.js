const chalk = require('chalk')
const MongoLib = require('../lib/mongo')

class ApiKeysService {
    constructor() {
        this.collection = 'api-keys'
        this.mongoDB = new MongoLib()
    }

    async getApiKey({ token }) {
        try {
            const [ apiKey ] = await this.mongoDB.getAll(this.collection,  { token })
            return apiKey
        } catch (error) {
            console.err(chalk.red("[GETAPIKEYS]: ", error.message))
        }
    }
}

module.exports = ApiKeysService
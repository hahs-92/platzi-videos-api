const chalk = require('chalk')
const MongoLib = require('../lib/mongo')

const bcrypt = require('bcrypt')

class UserService {
    constructor() {
        this.collection = 'users'
        this.MongoDB = new MongoLib()
    }

    async getUser({ email } ) {
        try {
            const [ user ] = await this.MongoDB.getAll(this.collection, { email })
            return user
        } catch (error) {
            console.error(chalk.red("[GETUSERS]: ", error.message))
        }
    }

    async createUser( { user } ) {
        try {
            const { name, email, password } = user
            //PARA VALIDAR SI EXISTE ESE CORREO EN LA DB Y NO CRERLO DE NUEVO
            const queriedUser = await this.getUser({ email: user.email })

            if(!queriedUser) {
                const hashedPassword = await bcrypt.hash(password, 6)
                const createUserId = await this.MongoDB.create(this.collection, { 
                    name,
                    email,
                    password: hashedPassword
                })

                return createUserId
            } else {
                return 'user already  exist'
            }
        } catch (error) {
            console.error(chalk.red("[CREATEUSERS]: ", error.message))
        }
    }

    //FUNCION PARA QUE VERIFIQUE SI YA EXISTE UN USUARIO 
    async verifyUserExist({ email }) {
        try {
            const [ user ] = await this.MongoDB.getAll(this.collection, { email })
            return user
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = UserService
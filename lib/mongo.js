const { MomgoClient, ObjectId, MongoClient } = require('mongodb')
const chalk = require('chalk')
const { config } = require('../config')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const BD_NAME = config.dbName


const MONGO_URI = `mongodb+srv://${ USER }:${ PASSWORD }@cluster0.memym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: false
        })
        this.dbName = BD_NAME
    }

    //SE USA EL PATRON SINGLETON PARA QUE MIRE SI YA HAY UNA CONECION QUE LA USE
    //EN CASO CONTRARIO HABRA UNA CONECCION
    //CADA VEZ QUE SE LLAME EL METODO CONECT , ESTE DEVUELVE UNA INSTANCIA DE LA CONEXION
    // connect() {
    //     if(!MongoLib.connection) {
    //         MongoLib.connection = new Promise((resolve, reject) => {
    //             this.client.connect( err => {
    //                 if(err) reject(err)

    //                 console.log(chalk("Connected succesfully to mongo"))
    //                 resolve(this.client.db(this.dbName))
    //             })
    //         })
    //     }

    //     return MongoLib.connection
    // }

    //CONECT CON ASYNC
    async connect() {
        if (!MongoLib.connection) {
          await this._client.connect();
          MongoLib.connection = this._client.db(this._dbName);
        }
        return MongoLib.connection
    }
}

module.exports = MongoLib
const { MomgoClient, ObjectId, MongoClient } = require('mongodb')
const chalk = require('chalk')
const { config } = require('../config')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName


const MONGO_URI = `mongodb+srv://${ USER }:${ PASSWORD }@cluster0.memym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        this.dbName = DB_NAME
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
        try {
            if (!MongoLib.connection) {
                await this.client.connect();
                MongoLib.connection = this.client.db(this.dbName);
              }
              return MongoLib.connection
        } catch (error) {
            console.error(chalk.red("[MONGO-CONNECT]: ", error))
        }
    }

    async getAll(collection, query) {
        try {
            const db = await this.connect()
            const result = await db.collection(collection).find(query).toArray()
            return result
        } catch (error) {
            console.error(chalk.red("[MONGO-GETALL]: ", error))
        }
    }

    async get(collection, id) {
        try {
            const db = await this.connect()
            const result = await db.collection(collection).findOne( { _id: ObjectId(id)} )//.toArray()
            return result
        } catch (error) {
            console.error(chalk.red("[MONGO-GET]: ", error))
        }
    }

    async create(collection , data) {
        try {
            console.log(chalk.blue("[MONGO-DATA]: ", data ))
            const db = await this.connect()
            const result = await db.collection(collection).insertOne(data)
            console.log(chalk.blue("[CREATE]: ", await result.insertedId))
            return await result.insertedId
        } catch (error) {
            console.error(chalk.red("[MONGO-CREATE]: ", error))
        }
    }

    async update(collection, id, data) {
        try {
            const db = await this.connect()
            const result = await db.collection(collection).updateOne({ _id: ObjectId(id)},{ $set: data }, { upsert: true } )
            return await result.upsertedId || id
        } catch (error) {
            console.error(chalk.red("[MONGO-UPDATE]: ", error))
        }
    }

    async delete(collection, id) {
        try {
            const db = await this.connect()
            const result = await db.collection(collection).deleteOne({ _id: ObjectId(id)} )
            // console.log(chalk.green("[MONGO-DATA-DELETE]: ", result))
            return result //PENDIENTE _ NO ME DEVULEVE EL ID SOLAMENTE
        } catch (error) {
            console.error(chalk.red("[MONGO-DELETE]: ", error))
        }
    }
}

module.exports = MongoLib
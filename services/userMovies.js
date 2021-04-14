const chalk = require('chalk')
const MongoLib = require('../lib/mongo')


class UserMoviesService {
    constructor() {
        this.collection = 'user-movies'
        this.mongoDB = new MongoLib()
    }

    async getUserMovies({ userId }) {
        try {
            const query = userId && { userId }
            const userMovies = await this.mongoDB.getAll(this.collection, query)
            return userMovies || []
            
        } catch (error) {
            console.error(chalk.red("[SERVICE/GETUSERMOVIES]: ", error))
        }
    }

    async createUserMovies({ userMovie }) {
        // console.log(chalk.blue("[SERVICE-DATA:] ", userMovie ))
        try {
            const createdUserMovieId = await this.mongoDB.create(this.collection, userMovie)
            return createdUserMovieId
        } catch (error) { 
            console.error(chalk.red("[SERVICE/CREATEUSERMOVIES]: ", error))
        }
    }

    async deleteUserMovies({ userMovieId }) {
        try {
            const deletedUserMovieId = await this.mongoDB.delete(this.collection, userMovieId)
            // console.log(chalk.blue("[SERVICES-DATA-DELETE]: ", deletedUserMovieId))
            return deletedUserMovieId
        } catch (error) {
            console.error(chalk.red("[SERVICE/GETUSERMOVIES]: ", error))
        }
    }
}

module.exports = UserMoviesService
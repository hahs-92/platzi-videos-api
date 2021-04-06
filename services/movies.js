//LOGICA DE NEGOCIOS
//CAPA DE NEGOCIOS
const chalk = require('chalk')

//MOCKS = YA NO ES NECESARIO XQ AHORA NOS CONECAMOS CON NUESTRA BASE DE DATOS
// const { moviesMock } = require('../utils/mocks/movies')

//LIB/MONGOO
const MongoLib = require('../lib/mongo')

class MoviesService {
    constructor() {
        this.collection = 'movies'
        this.mongoDB = new MongoLib()
    }

    async getMovies({ tags }) {
        try {
            const query = tags && { tags: { $in: tags } }
            const movies = await this.mongoDB.getAll(this.collection, query)
            return movies || []
        } catch (error) {
            console.error(chalk.red("[service/movies]: ", error))
        }
    }

    async getMovie({ movieId }) {
        try {
            const movie = await this.mongoDB.get(this.collection, movieId)
            return movie || []
        } catch (error) {
            console.error(chalk.red("[service/movies]: ", error))
        }
    }

    async createMovie({ movie }) {
        try {
            const idMovie = await this.mongoDB.create(this.collection, movie )
            return idMovie || []
        } catch (error) {
            console.error(chalk.red("[service/movies]: ", error))
        }
    }
    //falta el metodo pacth
    async updateMovie({ movieId, movie } = {} ) {
        try {
            const idMovie = await this.mongoDB.update(this.collection, movieId, movie)
            return idMovie || []
        } catch (error) {
            console.error(chalk.red("[service/movies]: ", error))
        }
    }

    async deleteMovie({ movieId }) {
        try {
            const idMovie = await this.mongoDB.delete(this.collection, movieId)
            return idMovie || []
        } catch (error) {
            console.error(chalk.red("[service/movies]: ", error))
        }
    }
}

module.exports = MoviesService
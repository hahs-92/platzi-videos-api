//LOGICA DE NEGOCIOS
//CAPA DE NEGOCIOS
const chalk = require('chalk')
const { moviesMock } = require('../utils/mocks/movies')

class MoviesService {
    constructor() {

    }

    async getMovies() {
        try {
            const movies = await Promise.resolve(moviesMock)
            return movies || []
        } catch (error) {
            console.error(chalk.red("[service/movies]: ", error))
        }
    }

    async getMovie() {
        try {
            const movie = await Promise.resolve(moviesMock[0])
            return movie || []
        } catch (error) {
            console.error(chalk.red("[service/movies]: ", error))
        }
    }

    async createMovie() {
        try {
            const idMovie = await Promise.resolve(moviesMock[0].id)
            return idMovie || []
        } catch (error) {
            console.error(chalk.red("[service/movies]: ", error))
        }
    }
    //falta el metodo pacth
    async updateMovie() {
        try {
            const idMovie = await Promise.resolve(moviesMock[0].id)
            return idMovie || []
        } catch (error) {
            console.error(chalk.red("[service/movies]: ", error))
        }
    }

    async deleteMovie() {
        try {
            const idMovie = await Promise.resolve(moviesMock[0].id)
            return idMovie || []
        } catch (error) {
            console.error(chalk.red("[service/movies]: ", error))
        }
    }
}

module.exports = MoviesService
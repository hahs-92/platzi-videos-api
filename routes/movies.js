const express = require('express')
const chalk = require('chalk')

const { moviesMock } = require('../utils/mocks/movies')

//NOS COMUNICAMOS CON LA,CAPA DE SERVICIO
const MoviesService = require('../services/movies')

function moviesApi(app) {
    const router = express.Router()
    app.use("/api/movies", router)

    //INSTANCIAMOS LA CLASE MOVIESERVICES 
    const moviesServices = new MoviesService()

    //SCHEMAS
    const {
        movieIdSchema,
        createMovieSchema,
        updateMovieSchema
    } = require('../utils/schema/movies')

    //VALIDATIONS
    const validationHandler = require('../utils/middlewares/validateHandler')

// ____________________________________________________________________________________________________

    router.get("/", async (req, res, next) => {
        try {
            // throw new Error(chalk.yellow("[ERROR GETALL]"))
            const { tags } = req.query
            // const movies = await Promise.resolve(moviesServices.getMovies({ tags }))
            const movies = await moviesServices.getMovies({ tags })

            res.status(200).json({
                data: movies,
                message: 'movies listed'
            })
        } catch (error) {
            console.error(chalk.red("[ROUTES-MOVIES] ", error))
            next(error)
        }
    })

    router.get("/:movieId", validationHandler({ movieId: movieIdSchema }, 'params'), async (req, res, next) => {
        try {
            const { movieId } = req.params
            // const movies = await Promise.resolve(moviesServices.getMovie({ movieId }))
            const movies = await moviesServices.getMovie({ movieId })
            res.status(200).json({
                data: movies,
                message: 'movies retrieve'
            })
        } catch (error) {
            console.error(chalk.red("[routes/movies] ", error.message))
            next(error)
        }
    })

    router.post("/", validationHandler(createMovieSchema), async (req, res, next) => {
        try {
            const { body: movie } = req
            // const idMovie = await Promise.resolve(moviesServices.createMovie({ movie }))
            const idMovie = await moviesServices.createMovie({ movie })

            res.status(201).json({
                data: idMovie,
                message: 'movie created'
            })
        } catch (error) {
            console.error(chalk.red("[routes/movies] ", error.message))
            next(error)
        }
    })

    router.put("/:movieId",validationHandler({ movieId: movieIdSchema }, 'params'), validationHandler(updateMovieSchema), async (req, res, next) => {
        try {
            const { movieId } = req.params
            const { body: movie } = req
            const idMovie = await moviesServices.updateMovie({
                movieId,
                movie
            })

            res.status(200).json({
                data: idMovie,
                message: 'movie update'
            })
        } catch (error) {
            console.error(chalk.red("[routes/movies] ", error.message))
            next(error)
        }
    })
    
    router.patch("/:movieId", validationHandler({ movieId: movieIdSchema }, 'params'), validationHandler(updateMovieSchema), async (req, res, next) => {
        try {
            const { movieId } = req.params
            const { body: movie } = req
            const idMovie = await moviesServices.updateMovie({
                movieId,
                movie
            })

            res.status(200).json({
                data: idMovie,
                message: 'movie update'
            })
        } catch (error) {
            console.error(chalk.red("[routes/movies] ", error.message))
            next(error)
        }
    })

    router.delete("/:movieId", validationHandler({ movieId: movieIdSchema }, 'params'), async (req, res, next) => {
        try {
            const { movieId } = req.params
            const idMovie = moviesServices.deleteMovie({ movieId })

            res.status(200).json({
                data: idMovie,
                message: 'movies deleted'
            })
        } catch (error) {
            console.error(chalk.red("[routes/movies] ", error.message))
            next(error)
        }
    })
}

module.exports = moviesApi
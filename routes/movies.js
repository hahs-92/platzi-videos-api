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

    router.get("/", async (req, res, next) => {
        try {
            throw new Error(chalk.yellow("[ERROR GETALL]"))
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

    router.get("/:movieId", async (req, res, next) => {
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

    router.post("/", async (req, res, next) => {
        try {
            const { body: movie } = req
            const idMovie = await Promise.resolve(moviesServices.createMovie({ movie }))

            res.status(201).json({
                data: idMovie,
                message: 'movies created'
            })
        } catch (error) {
            console.error(chalk.red("[routes/movies] ", error.message))
            next(error)
        }
    })

    router.put("/:movieId", async (req, res, next) => {
        try {
            const { movieId } = req.params
            const { body: movie } = req
            const idMovie = await Promise.resolve(moviesServices.updateMovie({
                movieId,
                movie
            }))

            res.status(200).json({
                data: idMovie,
                message: 'movie update'
            })
        } catch (error) {
            console.error(chalk.red("[routes/movies] ", error.message))
            next(error)
        }
    })
    
    router.patch("/:movieId", async (req, res, next) => {
        try {
            const { movieId } = req.params
            const { body: movie } = req
            const idMovie = await Promise.resolve(moviesServices.updateMovie({
                movieId,
                movie
            }))

            res.status(200).json({
                data: idMovie,
                message: 'movie update'
            })
        } catch (error) {
            console.error(chalk.red("[routes/movies] ", error.message))
            next(error)
        }
    })

    router.delete("/:movieId", async (req, res, next) => {
        try {
            const { movieId } = req.params
            const idMovie = await Promise.resolve(moviesServices.deleteMovie({ movieId }))

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
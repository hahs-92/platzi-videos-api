const express = require('express')
const { moviesMock } = require('../utils/mocks/movies')
const chalk = require('chalk')

function moviesApi(app) {
    const router = express.Router()
    app.use("/api/movies", router)

    router.get("/", async (req, res, next) => {
        try {
            const movies = await Promise.resolve(moviesMock)

            res.status(200).json({
                data: movies,
                message: 'movies listed'
            })
        } catch (error) {
            console.error(chalk.red("[routes/movies] ", error.message))
        }
    })

    router.get("/:moviedId", async (req, res, next) => {
        try {
            const movies = await Promise.resolve(moviesMock[0])

            res.status(200).json({
                data: movies,
                message: 'movies retrieve'
            })
        } catch (error) {
            console.error(chalk.red("[routes/movies] ", error.message))
        }
    })

    router.post("/", async (req, res, next) => {
        try {
            const idMovie = await Promise.resolve(moviesMock[0].id)

            res.status(201).json({
                data: idMovie,
                message: 'movies created'
            })
        } catch (error) {
            console.error(chalk.red("[routes/movies] ", error.message))
        }
    })

    router.put("/:movieId", async (req, res, next) => {
        try {
            const idMovie = await Promise.resolve(moviesMock[0].id)

            res.status(200).json({
                data: idMovie,
                message: 'movie update'
            })
        } catch (error) {
            console.error(chalk.red("[routes/movies] ", error.message))
        }
    })

    router.delete("/:movieId", async (req, res, next) => {
        try {
            const idMovie = await Promise.resolve(moviesMock[0].id)

            res.status(200).json({
                data: idMovie,
                message: 'movies deleted'
            })
        } catch (error) {
            console.error(chalk.red("[routes/movies] ", error.message))
        }
    })
}

module.exports = moviesApi
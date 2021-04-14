const express = require('express')
const passport = require('passport')
const chalk = require('chalk')

//ESTRATEGIA JWT
require('../utils/auth/strategies/jwt')

//SERVICE
const UserMoviesService = require('../services/userMovies')

//VALIDATION UTILS
const validationHandler = require('../utils/middlewares/validateHandler')
const scopeValidationHandler = require('../utils/middlewares/scopesValidationHandler')

//SCHEMAS
const  { movieIdSchema } = require('../utils/schema/movies')
const  { userIdSchema, createUserSchema } = require('../utils/schema/users')
const  {createUserMovieSchema } = require('../utils/schema/userMovies')

//DEFINE LAS RUTAS PARA USER
function userMoviesApi(app) {
    const router = express.Router()
    app.use('/api/user-movies', passport.authenticate('jwt', { session: false }), router)

    const userMoviesService = new UserMoviesService()

    //ROUTES
    router.get('/', scopeValidationHandler([ 'read: user-movies ']), validationHandler( { userId: userIdSchema}, 'query'), async (req, res, next) => {
        try {
            const { userId } = req.query
            const userMovies = await userMoviesService.getUserMovies({ userId })
            res.status(200).json({
                data: userMovies,
                message: 'user movies Listed'
            })
        } catch (error) {
            console.error(chalk("[ROUTES/USER/GET] :", error ))
            next(error)
        }
    })

    router.post('/', scopeValidationHandler([ 'create: user-movies ']),validationHandler( createUserMovieSchema ), async (req, res, next) => {
        try {
            // const { body: userMovie } = req.query
            const { body: userMovie } = req
            // console.log(chalk.blue("[ROUTES-DATA]: ", userMovie))
            const createdUserMovied = await userMoviesService.createUserMovies({
                userMovie
            })
            res.status(201).json({
                data: createdUserMovied,
                message: 'user movies Created'
            })
        } catch (error) {
            console.error(chalk("[ROUTES/USER/POST] :", error ))
            next(error)
        }
    })

    router.delete('/:userMovieId', scopeValidationHandler([ 'delete: user-movies ']),validationHandler( { userMovieId: movieIdSchema }, 'params'), async (req, res, next) => {
        try {
            const { userMovieId } = req.params
            const deletedUserMovieId = await userMoviesService.deleteUserMovies({ userMovieId })
            res.status(200).json({
                data: deletedUserMovieId,
                message: 'user movies Deleted'
            })
            // console.log(chalk.blue("[ROUTES-DATA-DELETE]: ", deletedUserMovieId))
        } catch (error) {
            console.error(chalk("[ROUTES/USER/DELETED] :", error ))
            next(error)
        }
    })
}

module.exports = userMoviesApi
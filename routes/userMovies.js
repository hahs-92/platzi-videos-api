const express = require('express')
const chalk = require('chalk')

//SERVICE
const UserMoviesService = require('../services/userMovies')
//VALIDATION UTILS
const validationHandler = require('../utils/middlewares/validateHandler')
//SCHEMAS
const  { movieIdSchema } = require('../utils/schema/movies')
const  { userIdSchema } = require('../utils/schema/users')
const  {createUserMovieSchema } = require('../utils/schema/userMovies')

//DEFINE LAS RUTAS PARA USER
function userMoviesApi(app) {
    const router = express.Router()
    app.use('/api/user-movies', router)

    const userMoviesService = new UserMoviesService()

    //ROUTES
    router.get('/', validationHandler( { userId: userIdSchema}, 'query'), async (req, res, next) => {
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
}
const express = require('express')
const passport = require('passport')
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')
const ApiKeysService = require('../services/apiKeys')

const {  config } = require('../config')
const chalk = require('chalk')

//SERVICES
const UserService = require('../services/users')

//VALIDATION HANDLER
const validationHandler = require('../utils/middlewares/validateHandler')

//SCHEMAS
const { createUserSchema, createProviderUserSchema } = require('../utils/schema/users')

//BASIC STRATEGY
require('../utils/auth/strategies/basic')

function authApi(app) {
    const router = express.Router()
    app.use('/api/auth', router)

    //INSTANCIAS
    const apiKeysService = new ApiKeysService()
    const userServive = new UserService()

    router.post('/sign-in', async (req, res, next) => {
        try {
            const { apiKeyToken } = req.body
            // console.log(chalk.green("apikeyToken: " , apiKeyToken ))
            if(!apiKeyToken) next(boom.unauthorized('apiKeyToken is required'))

            passport.authenticate('basic', (error, user) => {
                // console.log("[user:] ", user)
                try {
                    if(error || !user) next(boom.unauthorized())
                    req.login(user, { session: false }, async (error) => { //login es un metodo de passport.js
                        if(error) next(error)

                        const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken })

                        if(!apiKey) next(boom.unauthorized())

                        const { _id: id, name, email } = user

                        const payload = {
                            sub: id,
                            name,
                            email,
                            scopes: apiKey.scopes
                        }

                        const token = jwt.sign(payload, config.authJwtSecret, {
                            expiresIn: '15m'
                        })

                        return res.status(200).json({ token, user: { id, name, email } })

                    })
                } catch (error) {
                    next(error)
                }
            })(req, res, next)//ESTAS LINEAS SON PORQUE ES UNA CLOUSURE, ES DECIR LE ESTAMOS PASANDO ESTOS PARAMOS A LA FUNCION QUE RETORN EL CB
            
        } catch (error) {
            next()
        }
    })

    router.post('/sign-up', validationHandler(createUserSchema), async (req, res, next) => {
        try {
            const { body: user } = req
            const userExist = await userServive.verifyUserExist(user)

            if(userExist) {
                res.send({
                    message: 'user already exist'
                })
                return false
            } 

            const createdUserId = await userServive.createUser({ user })
            res.status(201).json({
                data: createdUserId,
                message: 'User Created'
            })
        } catch (error) {
            next(error)
        }
    })

    router.post('/sign-provider', validationHandler(createProviderUserSchema), async (req, res, next) => {
        const { body } = req
        const { apiKeyToken,  ...user } = body

        if(!apiKeyToken) next(boom.unauthorized('apiKeyToken is requerido'))

        try {
            const queriedUser = await userServive.getOrCreateUser({ user })
            const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken })

            if(!apiKey) next(boom.unauthorized())

            const { _id: id, name, email } = queriedUser

            const payload = {
                sub: id,
                name,
                email,
                scopes: apiKey.scopes
            }

            const token = jwt.sign(payload, config.authJwtSecret, {
                expiresIn: '15m'
            })

            return res.status(200).json({ token, user: { id, name, email }})
        } catch (error) {
            next(error)
        }

    })
}

module.exports = authApi
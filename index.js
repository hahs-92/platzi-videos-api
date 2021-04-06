const express = require('express')
const chalk = require('chalk')

//CONFIG
const { config } = require('./config')

//MIDDLEWARES ERROS
const { logErrors, errorHandler, wrapError } = require('./utils/middlewares/errorHandler')

const notFoundHandler = require('./utils/middlewares/notFoundHandler')

//ROUTES
const moviesApi = require('./routes/movies')

// ____________________________________________________________________________________________

const app = express()

//MIDDLEWARE PARA RECIBIR JSON
app.use(express.json())

//ROUTES
moviesApi(app)
//CATCH ERROR 404
app.use(notFoundHandler)

//MIDDLEWARES ERROS DEBEN IR AL FINAL
app.use(logErrors)
app.use(wrapError)
app.use(errorHandler)


// app.get('/', ( req, res) => {
//     res.send('Hello Word')
// })

app.listen(config.port, () => {
    console.log(chalk.green(`Listening http://localhost:${ config.port}`))
})
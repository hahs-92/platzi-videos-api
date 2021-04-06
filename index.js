const express = require('express')
const chalk = require('chalk')

//ROUTES
const moviesApi = require('./routes/movies')

// ____________________________________________________________________________________________

const app = express()

//MIDDLEWARE PARA RECIBIR JSON
app.use(express.json())

moviesApi(app)

const { config } = require('./config')

app.get('/', ( req, res) => {
    res.send('Hello Word')
})

app.listen(config.port, () => {
    console.log(chalk.green(`Listening http://localhost:${ config.port}`))
})
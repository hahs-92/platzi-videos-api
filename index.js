const express = require('express')
const chalk = require('chalk')

const app = express()

const { config } = require('./config')

app.get('/', ( req, res) => {
    res.send('Hello Word')
})

app.listen(config.port, () => {
    console.log(chalk.green(`Listening http://localhost:${ config.port}`))
})
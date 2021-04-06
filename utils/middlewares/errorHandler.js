const chalk = require('chalk')
const { config } = require('../../config')


//ESTA FUNCION NO ES UN MIDDLEWARE
function withErrorStack(err, stack) {
    if(config.dev) {
        return { err, stack }
    }

    return err
}

//MIDDELWARES ERROS

function logErrors(err, req, res, next) {
    console.error(chalk.red("[LOG-ERRORS]: ",err.message))
    next(err)
}

function errorHandler(err, req, res, next) {
    res.status(err.status || 500 )
    res.json(withErrorStack(err.message,err.stack))
}

module.exports = {
    logErrors,
    errorHandler
}
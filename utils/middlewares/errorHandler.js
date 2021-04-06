const chalk = require('chalk')
const boom = require('@hapi/boom')

//CONFIG
const { config } = require('../../config')


//ESTA FUNCION NO ES UN MIDDLEWARE
function withErrorStack(err, stack) {
    if(config.dev) {
        return { ...err, stack }
    }

    return err
}

//MIDDELWARES ERROS

function logErrors(err, req, res, next) {
    console.error(chalk.red("[LOG-ERRORS]: ",err.message))
    next(err)
}

//POR SI ALHUN CODIGO ERR QUE VENGA NO ESTE EN BOOM, PARA QUE TODOS TENGAN LA ESTRUCUTURA DE BOOM
function wrapError(err, req, res, next) {
    if(!err.isBoom) {
        next(boom.badImplementation(err))
    }

    next(err)
}

function errorHandler(err, req, res, next) {
    const { ouput: { statusCode,payload } } = err
    // res.status(err.status || 500 )
    res.status(statusCode)
    // res.json(withErrorStack(err.message,err.stack))
    res.json(withErrorStack(err.stack,payload))
}

module.exports = {
    logErrors,
    wrapError,
    errorHandler
}
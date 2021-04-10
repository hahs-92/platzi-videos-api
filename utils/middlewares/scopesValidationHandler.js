const boom = require('@hapi/boom')

function scopeValidationHandler(allowedScopes) {
    return (req, res, next)  => {
        if(!req.user || !req.user.scopes) {
            next(boom.unauthorized('Missing scopes'))
        }

        const permisions = allowedScopes.map(scope => {
            req.user.scopes.includes(scope)
        })

        const hashAcces = !permisions.includes(false)

        hashAcces ? next() : next(boom.unauthorized('Scopes Insuficientes'))
    }
}

module.exports = scopeValidationHandler
const boom = require('@hapi/boom')
const joi = require('joi')

function validate(data, schema) {
    // If schema is not a joi schema convert to a joi schema object otherwise return schema
	// schema = !joi.isSchema(schema) ? joi.object(schema) : schema;
	// const { error } = schema.validate(data)
    //ESTAS LINEAS REEMPLAZAN LAS DE ARRIBA POR CAMBIO DE VERSION DE JOI
    const joiSchema = joi.object(schema)
    const { error } = joiSchema.validate(data)
	return error
}

function validationHandler(schema, check = "body") {
    return (req, res, next) => {
        const error = validate(req[check], schema)

        // error ? next(new Error(error)) : next()
        error ? next(boom.badRequest(error)) : next()
    }
}

module.exports = validationHandler
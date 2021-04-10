//ESTA ESTRATEGIA SE IMPLEMENTARA COMO MIDDLEWARE PARA SABER SI EL USURIO ESTA AUTORIZADO

const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const UserService = require('../../../services/users')

passport.use(new BasicStrategy(async (email, password, cb) => {
    try {
        const userService = new UserService()
        const user = await userService.getUser( { email } )

        if(!user) return cb(boom.unauthorized(), false)
        if(!(await bcrypt.compare(password, user.password))) return cb(boom.unauthorized(),false)

        //PARA QUE NO QUEDE EN EL CODIGO LA PASSWORD
        delete user.password
        return cb(null, user)

    } catch (error) {
        return cb(error)
    }
}))

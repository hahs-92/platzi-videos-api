require('dotenv').config();
const { config } = require('../config')


// function cacheResponse(res, seconds) {
//     //TENGO UN ERROR XQ ME ARROJA TRUE EN DEV
//     if(process.env.NODE_ENV !== "development") {
//         console.log("[DEV]: ", false)
//         res.set('Cache-Control', `public, max-age=${ seconds }`)
//     }
// }

function cacheResponse(res, seconds) {
    if(process.env.NODE_ENV.trim() === "production") {
        console.log("[DEV]: ", false)
        res.set('Cache-Control', `public, max-age=${ seconds }`)
    }
}

module.exports = cacheResponse
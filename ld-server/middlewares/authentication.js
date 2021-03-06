const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

function authentication(req,res,next) {
    try {
        let decodedToken = verifyToken(req.headers.access_token)

        User.findOne({
            where : {
                id:decodedToken.id
            }
        })
        .then(user=>{
            if(user) {
                req.loggedUser = decodedToken
                return next()
            } else {
                return next({status:401, msg:'authentication failed'})
            }
        })
        .catch(next)
    }
    catch (err) {
        return next({status:401, msg:'you must login first'})
    }
}



module.exports = { authentication }
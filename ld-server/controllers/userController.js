const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {

    static register (req,res,next) {
        let { email, password } = req.body
        User.create({ email, password })
        .then(result => {
            return res.status(201).json({ id:result.id, email:result.email })
        })
        .catch(next)
    }

    static login (req,res,next) {
        let { email,password } = req.body
        User.findOne({
            where: { email }
        })
        .then(user=>{
            if(user && comparePassword(password, user.password)) {
                let payload = { email:user.email, id:user.id }
                let access_token = generateToken(payload)
                return res.status(200).json({ access_token, id:user.id, email:user.email })
            } else {
                return next()
            }
        })
        .catch(next)
    }
}

module.exports = UserController
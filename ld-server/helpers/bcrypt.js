const bcrypt = require('bcryptjs')

function hashPassword(password) {
    let salt = bcrypt.genSaltSync(10)
    bcrypt.hashSync(password, salt)
}

function comparePassword(password, hashPassword) {
    bcrypt.compareSync(password, hashPassword)
}

module.exports = { hashPassword, comparePassword }
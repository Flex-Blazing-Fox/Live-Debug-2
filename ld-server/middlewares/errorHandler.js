function errorHandler (req,res,next,err) {
    let message = err.msg || 'internal server error'
    let status = err.status || 500
    switch (err.name) {
        case "SequelizeUniqueConstraintError":
            res.status(400).json({ message:'Email is already exists' })    
            break;
        case "SequelizeValidationError":
            message = []
            for (let i = 0; i < err.errors.length; i++) {
                message.push(err.errors[i].message)
            }
            res.status(400).json({ message })
            break;   
        case 'SequelizeForeignKeyConstraintError': 
            status = 400
            message = `ForeignKey error!` 
            break; 
        case 'JsonWebTokenError': 
        case 'TokenExpiredError': 
            status = 401
            message = 'Failed to authenticate'
            break;
        default:
            res.status(status).json({ message })
            break;
    }
}

module.exports = errorHandler
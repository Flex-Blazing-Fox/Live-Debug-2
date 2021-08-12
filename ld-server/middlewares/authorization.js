const { Report } = require('../models')

function authorization(req,res,next) {
    let { id } = req.params
    
    Report.findByPk(id)
    .then(result=>{
        if(!result) return next({ status: 404, msg: 'Report not found' })
        if(result.userId == req.loggedUser.id) {
            return next()
        } else {
            return next({ status: 401,msg: "not authorized" })
        }
    })
    .catch(next)
}



module.exports = authorization
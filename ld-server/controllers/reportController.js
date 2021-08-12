const { Report } = require('../models')

class ReportController {
    static create (req,res,next) {
        let { description, location } = req.body
        Report.create({
            description,
            location,
            userId: req.loggedUser.id
        })
            .then(data => {
                res.status(201).json({
                    report: data
                })
            })
            .catch(next)
    }

    static delete (req,res,next) {
        Report.findByPk(req.params.reportId)
        .then((data) => {
          if (!data) {
            return res.status(400).json({ message: 'Data Not Found' });
          }
          console.log(data)
    
          Report.destroy({ where: { id: req.params.reportId } })
            .then(() => {
              return res.status(200).json({ message: 'Successfully delete data' })
            })
            .catch((error) => {
              return res.status(400).json(error)
            })
        })
        .catch(next)
    }
}

module.exports = ReportController
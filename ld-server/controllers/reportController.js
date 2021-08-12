const { Report } = require('../models')

class ReportController {
    static create (req,res,next) {
        let { description, location } = req.body
        Report.create({
            description,
            location
        })
            .then(data => {
                res.status(201).json({
                    report: data
                })
            })
            .catch(next)
    }

    static delete (req,res,next) {
        Report.findOne(req.params.id)
        .then((data) => {
          if (!data) {
            return res.status(400).json({ message: 'Data Not Found' });
          }
    
          data.destroy()
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
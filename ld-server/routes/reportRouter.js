const router = require('express').Router()
const reportController = require('../controllers/reportController')
const authorization = require('../middlewares/authorization')

router.post('/', reportController.create)
router.delete('/:reportId', authorization, reportController.delete)


module.exports = router
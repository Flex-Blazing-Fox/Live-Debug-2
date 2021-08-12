const router = require('express').Router()
const userRouter = require('./userRouter')
const reportRouter = require('./reportRouter')
const { authentication } = require('../middlewares/authentication')

router.get('/', (req,res) => res.json({ msg: 'welcome to the server' }))
router.use('/', userRouter)

router.use(authentication)
router.use('/reports', reportRouter)

module.exports = router
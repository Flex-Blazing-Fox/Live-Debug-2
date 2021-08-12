const express = require('express')
const app = express()
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(errorHandler)
app.use(routes)

module.exports = app

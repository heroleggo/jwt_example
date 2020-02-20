const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
const app = express()
const sequelize = require('./models/db').sequelize
const router = require('./api/user')

sequelize.sync()

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(router)

module.exports = app 
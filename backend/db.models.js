var path = require('path')
var Sequelize = require('sequelize')

require('dotenv').config()

var env = process.env.NODE_ENV || 'development'
var config = require(path.join(__dirname, 'db.config.js'))[env]
var db = {}

var sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize
db.Sequelize = Sequelize

db.User = require('./db.user')(sequelize, Sequelize)
db.Log = require('./db.log')(sequelize, Sequelize)

module.exports = db
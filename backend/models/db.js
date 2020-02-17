var path = require('path')
var Sequelize = require('sequelize')

require('dotenv').config()

var env = process.env.NODE_ENV || 'development'
var config = require(path.join(__dirname, '..', 'config', 'db.js'))[env]
var db = {}

var sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize
db.Sequelize = Sequelize

db.User = require('./user/db')(sequelize, Sequelize)
db.Log = require('./log/db')(sequelize, Sequelize)

module.exports = db
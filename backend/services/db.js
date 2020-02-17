var dbms = require('../models/db')

const db = {
	createUser ({name, email, password}) {
		return dbms.User.create({name: name, email: email, password: password})
	},
	findUser ({email, password}) {
		return dbms.User.findAll({raw: true, where: {email: email, password: password}})
	},
	findUserById (id) {
		return dbms.User.findAll({raw: true, where: {idx: id}})
	},
	removeUser ({email, password}) {
		return dbms.User.destroy({where: {email: email, password: password}})
	},
	changePassword ({email, newPassword}) {
		return dbms.User.update({password: newPassword}, {where: {email: email}})
	},
	createAccessLog ({userId}) {
		var a = new Date()
		return dbms.Log.create({idx: userId, createAt: a.toString()})
	},
	findAccessLog ({userId}) {
		return dbms.Log.findAll({raw: true, where: {idx: userId}})
	}
}

module.exports = db
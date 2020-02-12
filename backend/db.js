var dbreq = require('./db.models')

const db = {
  createUser ({name, email, password}) {
    return dbreq.User.create({name: name, email: email, password: password})
  },
  findUser ({email, password}) {
      return dbreq.User.findAll({raw: true, where: {email: email, password: password}})
  },
  findUserById (id) {
    return dbreq.User.findAll({raw: true, where: {idx: id}})
  },
  findAccessLog ({userId}) {
    return dbreq.Log.findAll({raw: true, where: {idx: userId}})
  },
  createAccessLog ({userId}) {
    var a = new Date()
    return dbreq.Log.create({idx: userId, createAt: a.toString()})
  },
  removeUser ({email, password}) {
    return dbreq.User.destroy({where: {email: email, password: password}})
  },
  changePassword ({email, newPassword}) {
    console.log(email, newPassword)
    return dbreq.User.update({password: newPassword}, {where: {email: email}})
  }
}

module.exports = db

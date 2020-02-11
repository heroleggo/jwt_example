var _db = {
  users: [
    {id:1, name: 'chris', email: 'test@test.com', password: 'password'},
    {id:2, name: 'hero', email: 'asd@asd.com', password: 'password'}
  ],
  logs: [

  ]
}

const db = {
  findUser ({email, password}) {
    const validator = user => user.email === email && user.password === password
    return Promise.resolve()
      .then(() => _db.users.filter(validator)[0])
  },
  findUserById (id) {
    id = id * 1
    const validator = user => user.id === id
    return Promise.resolve()
      .then(() => _db.users.filter(validator)[0])
  },
  findAccessLog ({userId}) {
    return Promise.resolve()
      .then(() => _db.logs.filter(l => l.userId === userId))
  },
  createAccessLog ({userId}) {
    return Promise.resolve()
      .then(() => _db.logs.push({userId, createAt: new Date}))
  },
  removeUser ({email, password}) {
    const validator = user => user.email !== email && user.password !== password
    return Promise.resolve()
      .then(() => {
        _db.users = _db.users.filter(validator)
      })
  },
  changeUserPassword ({email, password}) {
    const validator = user => user.email === email && user.password === password
    const validator_ = user => user.email !== email && user.password !== password
    return Promise.resolve()
      .then(() => {
        const val = _db.users.filter(validator)[0] // get user information
        _db.users = _db.users.filter(validator_) // first, remove information from db
        val.password = password // change information's password
        _db.users.push(val) // add information to db
      })
  }
}

module.exports = db

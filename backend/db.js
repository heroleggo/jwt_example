const _db = {
  users: [
    {id: 1, name: 'Chris', email: 'test@test.com', password: 'password'}
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
  }
}

module.exports = db
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
const db = require('./db')
const auth = require('./auth')
const app = express()
const sequelize = require('./db.models').sequelize

sequelize.sync()

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/home', async (req, res) => {
  let user
  try { // in home directory, verified token is used
    user = auth.verify(req.headers.authorization)
  } catch (e) {

  }

  user = user ? await db.findUserById(user.id) : null
  const name = user ? user[0].name : 'World'

  res.json({ greeting: `Hello ${name}` })
})

app.get('/me', auth.ensureAuth(), async (req, res) => { // information page -> only authorized user can access to info page
  const user = await db.findUserById(req.user.id)
  const accessLog = await db.findAccessLog({userId: user[0].idx})
  res.json({user, accessLog})
})

app.post('/login', async (req, res) => {
  const {email, password} = req.body

  const user = await db.findUser({email, password})
  if (!user || !user[0].idx) return res.status(401).json({error: 'Login Failed'})

  await db.createAccessLog({userId: user[0].idx})
  const accessToken = auth.signToken(user[0].idx)
  res.json({accessToken})
})

app.post('/change', auth.ensureAuth(), async (req, res) => {
  const { email, password, newPassword, confirmPassword } = req.body
  if (newPassword != confirmPassword) return res.status(401).json({error: 'Confirm Failed'})
  const user = await db.findUser({email, password})
  if (!user || !user[0].idx) return res.status(401).json({error: 'Wrong Input'})
  console.log(email, newPassword)
  await db.changePassword({email, newPassword})
  console.log("changed")
  res.json({status: 'success'})
})

app.post('/remove', auth.ensureAuth(), async (req, res) => {
  const { email, password } = req.body

  const user = await db.findUser({email, password})
  if (!user || !user[0].idx) return res.status(401).json({error: 'Wrong Input'})

  await db.removeUser({email, password})

  res.json({status: 'success'})
})

app.post('/register', async (req, res) => {
  const {name, email, password} = req.body

  const user = await db.createUser({name, email, password})
  console.log(user)
  res.json({status: 'success'})
})

app.use((err, req, res, next) => {
  console.log(err)
  res.json({error: err.message})
})

module.exports = app 
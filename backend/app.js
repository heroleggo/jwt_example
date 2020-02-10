const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
const db = require('./db')
const auth = require('./auth')
const app = express()

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

  console.log(user)
  user = user ? await db.findUserById(user.id) : null
  const name = user ? user.name : 'World'

  res.json({ greeting: `Hello ${name}` })
})

app.get('/me', auth.ensureAuth(), async (req, res) => { // information page -> only authorized user can access to info page
  const user = await db.findUserById(req.user.id)
  const accessLog = await db.findAccessLog({userId: user.id})
  res.json({user, accessLog})
})

app.post('/login', async (req, res) => {
  const {email, password} = req.body

  const user = await db.findUser({email, password})
  if (!user || !user.id) return res.status(401).json({error: 'Login Failed'})

  await db.createAccessLog({userId: user.id})
  const accessToken = auth.signToken(user.id)
  res.json({accessToken})
})

app.post('/change', auth.ensureAuth(), async (req, res) => {
  const { email, password, newPassword, confirmPassword } = req.body
  
  const user = await db.findUser({email, password})
  if (!user || !user.id) return res.status(401).json({error: 'Wrong Input'})
  if (newPassword !== confirmPassword) return res.status(401).json({error: 'Confirm Failed'})
  await db.changeUserPassword({email, newPassword})
  res.json({status: 'success'})
})

app.post('/remove', auth.ensureAuth(), async (req, res) => {
  const { email, password } = req.body

  const user = await db.findUser({email, password})
  if (!user || !user.id) return res.status(401).json({error: 'Wrong Input'})

  await db.removeUser({email, password})
})

app.use((err, req, res, next) => {
  console.log(err)
  res.json({error: err.message})
})

module.exports = app 
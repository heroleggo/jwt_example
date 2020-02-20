const express = require('express')
const controller = require('../controllers/user')
const auth = require('../auth')

const router = express.Router()

router.get('/home', controller.home)
router.get('/me', auth.ensureAuth(), controller.me)
router.post('/login', controller.login)
router.post('/change', auth.ensureAuth(), controller.change)
router.post('/remove', auth.ensureAuth(), controller.remove)
router.post('/register', controller.register)
router.use(controller.er)

module.exports = router
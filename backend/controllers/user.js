const service = require('../services/user')
const auth = require('../auth')

let home = async (req, res) => {
	let user
	try {
		user = auth.verify(req.headers.authorization)
	} catch (e) {

	}
	user = user ? await service.findUserById(user.id) : null
	const name = user ? user[0].name : 'World'
	res.json({greeting: `Hello ${name}`})
}

let me = async (req, res) => {
	const user = await service.findUserById(req.user.id)
	const accessLog = await service.findAccessLog({userId: user[0].idx})
	res.json({user, accessLog})
}

let login = async (req, res) => {
	const {email, password} = req.body
	const user = await service.findUser({email, password})
	if (!user || !user[0].idx) return res.status(401).json({error: 'Login Failed'})
	await service.createAccessLog({userId: user[0].idx})
	const accessToken = auth.signToken(user[0].idx, user[0].name)
	res.json({accessToken})
}

let change = async (req, res) => {
	const {email, password, newPassword, confirmPassword} = req.body
	if (newPassword != confirmPassword) return res.status(401).json({error: 'Confirm Failed'})
	const user = await service.findUser({email, password})
	if (!user || !user[0].idx) return res.status(401).json({error: 'Wrong Input'})
	console.log(email, newPassword)
	await service.changePassword({email, newPassword})
	console.log('changed')
	res.json({status: 'success'})
}

let remove = async (req, res) => {
	const {email, password} = req.body
	const user = await service.findUser({email, password})
	if (!user || !user[0].idx) return res.status(401).json({error: 'Wrong Input'})
	await service.removeUser({email, password})
	res.json({status: 'success'})
}

let register = async (req, res) => {
	const {name, email, password} = req.body
	const user = await service.createUser({name, email, password})
	console.log(user)
	res.json({status: 'success'})
}

let er = (err, req, res, next) => {
	console.log(err)
	res.json({error: err.message})
}

module.exports = {
	home: home,
	me: me,
	login: login,
	change: change,
	remove: remove,
	register: register,
	er: er
}
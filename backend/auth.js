const jwt = require('jsonwebtoken')
const secret = 'secretfortoken'
const expiresIn = 60 * 10

const auth = {
	signToken (id, name) {
		const subject = name
		return jwt.sign({id}, secret, {expiresIn, subject})
	},
	ensureAuth () {
		return (req, res, next) => {
			const {authorization} = req.headers
			if (!authorization) {
				res.status(401)
				throw Error('No Authorization Headers')
			}
			try {
				req.user = this.verify(authorization)
			} catch (e) {
				if (e.name === 'TokenExpiredError') {
					res.status(401).json({
						message: 'Token has expired'
					})
				} else {
					res.status(401).json({
						message: 'Token is invalid'
					})
				}
				throw e
			}
			next()
		}
	},
	verify (token) {
		return jwt.verify(token.replace(/^Bearer\s/, ''), secret)
	}
}

module.exports = auth
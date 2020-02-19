export default {
	LOGIN (state, {accessToken}) {
		state.accessToken = accessToken
		localStorage.accessToken = accessToken
	},
	LOGOUT (state) {
		state.accessToken = null
		delete localStorage.accessToken
	},
	CHANGE (state) {
		state.accessToken = null
		delete localStorage.accessToken
	},
	REMOVE (state) {
		state.accessToken = null
		delete localStorage.accessToken
	},
	REGISTER (state) {
		state.accessToken = null
		delete localStorage.accessToken
	}
}
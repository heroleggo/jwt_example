export default {
	isAuthenticated (state) {
		state.accessToken = state.accessToken || localStorage.accessToken
		return state.accessToken
	}
}
import axios from 'axios'

const resourceHost = 'http://localhost:3000'

export default {
	LOGIN ({commit}, {email, password}) {
		return axios.post(`${resourceHost}/login`, {email, password})
			.then(({data}) => {
				commit('LOGIN', data)
				axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
			})
	},
	LOGOUT ({commit}) {
		axios.defaults.headers.common['Authorization'] = undefined
		commit('LOGOUT')
	},
	CHANGE ({commit}, {email, password, newPassword, confirmPassword}) {
		return axios.post(`${resourceHost}/change`, {email, password, newPassword, confirmPassword})
			.then(() => {
				commit('CHANGE')
				axios.defaults.headers.common['Authorization'] = undefined
			})
	},
	REMOVE ({commit}, {email, password}) {
		return axios.post(`${resourceHost}/remove`, {email, password})
			.then(() => {
				commit('REMOVE')
				axios.defaults.headers.common['Authorization'] = undefined
			})
	},
	REGISTER ({commit}, {name, email, password}) {
		return axios.post(`${resourceHost}/register`, {name, email, password})
			.then(() => {
				commit('REGISTER')
				axios.defaults.headers.common['Authorization'] = undefined
			})
	}
}
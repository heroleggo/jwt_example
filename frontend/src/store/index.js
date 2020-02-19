import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const enhanceAccessToken = () => {
	const {accessToken} = localStorage
	if (!accessToken) return
	axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
}
enhanceAccessToken()

export default new Vuex.Store({
	state: {
		accessToken: null
	},
	actions,
	mutations,
	getters
})
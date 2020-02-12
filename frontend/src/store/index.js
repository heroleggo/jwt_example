import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const resourceHost = 'http://localhost:3000'

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
  getters: {
    isAuthenticated (state) {
      state.accessToken = state.accessToken || localStorage.accessToken
      return state.accessToken
    }
  },
  mutations: {
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
  },
  actions: {
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
})
<template>
  <div>
    <b-navbar style="background-color: #c0ff96">
    <b-navbar-brand class="col-sm text-primary">NavBar</b-navbar-brand>

    <b-link class="col-sm text-secondary" to="/">Home</b-link>

    <a class="col-sm text-secondary" href="" v-if="isAuthenticated" @click.prevent="onClickLogout">Logout</a>

    <b-link class="col-sm text-secondary" to="/login">Login</b-link>

    <b-link class="col-sm text-secondary" to="/me">Me</b-link>

    <b-link class="col-sm text-secondary" to="/change">Change Info</b-link>

    <b-link class="col-sm text-secondary" to="/remove">Remove Account</b-link>

    <b-link class="col-sm text-secondary" to="/register">Register</b-link>
    </b-navbar>
  </div>
</template>

<script>
import store from '../store'

export default {
  computed: {
    isAuthenticated () {
      return store.getters.isAuthenticated
    }
  },
  methods: {
    onClickLogout () {
      store.dispatch('LOGOUT').then(() => this.$router.push('/'))
    }
  }
}
</script>

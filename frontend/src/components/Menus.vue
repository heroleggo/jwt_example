<template>
	<div>
		<b-navbar style="background-color: #C0FF96">
			<b-navbar-brand class="col-sm text-primary">Navbar</b-navbar-brand>
			<div v-if="isAuthenticated">
				<b-link class="col-sm text-secondary" to="/">Home</b-link>
				<a class="col-sm text-secondary" href="" @click.prevent="onClickLogout">Logout</a>
				<b-link class="col-sm text-secondary" to="/me">Info</b-link>
				<b-link class="col-sm text-secondary" to="/change">Change Info</b-link>
				<b-link class="col-sm text-secondary" to="/remove">Remove Account</b-link>
			</div>
			<div v-else>
				<b-link class="col-sm text-secondary" to="/">Home</b-link>
				<b-link class="col-sm text-secondary" to="/login">Login</b-link>
				<b-link class="col-sm text-secondary" to="/me">Info</b-link>
				<b-link class="col-sm text-secondary" to="/remove">Remove Account</b-link>
				<b-link class="col-sm text-secondary" to="/register">Register</b-link>
			</div>
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
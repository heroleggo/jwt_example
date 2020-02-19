<template>
	<div style="margin-left: 20px;">
		<br>
		<h2>Change Password</h2>
		<br>
		<b-form @submit.prevent="onSubmit(email, password, newPassword, confirmPassword)">
			<input type="text" v-model="email" placeholder="Enter E-mail Address">
			<br>
			<br>
			<input type="password" v-model="password" placeholder="Enter password">
			<br>
			<br>
			<input type="password" v-model="newPassword" placeholder="Enter New Password">
			<br>
			<br>
			<input type="password" v-model="confirmPassword" placeholder="Re-enter New Password">
			<br>
			<br>
			<input type="submit" value="Change">
		</b-form>
		<p><i></i></p>
	</div>
</template>

<script>
export default {
	data () {
		return {
			email: '',
			password: '',
			msg: ''
		}
	},
	methods: {
		onSubmit (email, password, newPassword, confirmPassword) {
			this.$store.dispatch('CHANGE', {email, password, newPassword, confirmPassword})
				.then(() => {
					this.$router.push('/')
				})
				.catch(({message}) => this.msg = message)
		},
		redirect () {
			this.$router.push('/')
		}
	}
}
</script>

<template>
  <div>
    <h2>Change Password</h2>
    <form @submit.prevent="onSubmit(email, password)">
      <input type="text" v-model="email" placeholder="Email Address">
      <input type="password" v-model="newPassword" placeholder="new password">
      <input type="password" v-model="confirmPassword" placeholder="confirm password">
      <input type="submit" value="Change">
    </form>
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
    onSubmit (email, password) {
      this.$store.dispatch('CHANGE', {email, password})
        .then(() => this.redirect())
        .catch(({message}) => this.msg = message)
    },
    redirect () {
      this.$router.push('/home')
    }


  }
}
</script>

<style scoped>

</style>
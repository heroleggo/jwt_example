<template>
  <div>
    <h2>Login</h2>
    <b-form @submit.prevent="onSubmit(email, password)">
      <input type="text" v-model="email" placeholder="Email Address">
      <input type="password" v-model="password" placeholder="Password">
      <input type="submit" value="Login">
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
    onSubmit(email, password) {
      this.$store.dispatch('LOGIN', {email, password})
        .then(() => this.redirect())
        .catch(({message}) => this.msg = message)
    },
    redirect () {
      const {search} = window.location
      const tokens = search.replace(/^\?/, '').split('&')
      const {returnPath} = tokens.reduce((qs, tkn) => {
        const pair = tkn.split('=')
        qs[pair[0]] = decodeURIComponent(pair[1])
        return qs
      }, {})

      this.$router.push(returnPath)
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <h2>Remove User</h2>
    <b-form @submit.prevent="onSubmit(email, password)">
      <input type="text" v-model="email" placeholder="Email Address">
      <input type="password" v-model="password" placeholder="Enter password">
      <input type="submit" value="Remove">
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
      this.$store.dispatch('REMOVE', {email, password})
        .then(() => this.redirect('/home'))
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

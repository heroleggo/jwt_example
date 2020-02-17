  <template>
  <div style="margin-left: 20px;">
    <br>
    <h2>Register</h2>
    <br>
    <div v-if="this.$store.getters['isAuthenticated']">You are already registered!</div>
    <b-form v-else @submit.prevent="onSubmit(name, email, password, confirmPassword)">
      <input type="text" v-model="name" placeholder="Enter Name">
      <br>
      <br>
      <input type="password" v-model="password" placeholder="Enter password">
      <br>
      <br>
      <input type="password" v-model="confirmPassword" placeholder="Re-Enter password">
      <br>
      <br>
      <input type="email" v-model="email" placeholder="Enter email">
      <br>
      <br>
      <input type="submit" value="Register">
    </b-form>
    {{ msg }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      msg: ''
    }
  },
  methods: {
    onSubmit(name, email, password, confirmPassword) {
      if (password === confirmPassword) {
        this.$store.dispatch('REGISTER', {name, email, password})
          .then(() => this.$router.push('/'))
          .catch(({message}) => this.msg = message)
      }
    },
    redirect () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>

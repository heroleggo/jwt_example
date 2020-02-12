<template>
  <div class="col-md">
    <br>
    <h2>Information</h2>
    <br>
    <div>
      <table style="border: 1px solid black; align-content: center; align-items: center;">
        <tr style="border: 0.5px solid black">
          <td style="border: 0.5px solid black">User Name</td>
          <td style="border: 0.5px solid black">{{ user.name }}</td>
        </tr>
        <tr style="border: 0.5px solid black">
          <td style="border: 0.5px solid black">E-mail</td>
          <td style="border: 0.5px solid black">{{ user.email }}</td>
        </tr>
        <tr style="border: 0.5px solid black">
          <td style="border: 0.5px solid black">Password</td>
          <td style="border: 0.5px solid black">{{ user.password }}</td>
        </tr>
        <tr style="border: 0.5px solid black">
          <td style="border: 0.5px solid black">id</td>
          <td style="border: 0.5px solid black">{{ user.idx }}</td>
        </tr>
      </table>
    </div>
    <br>
    <div>
      <label>Access Log:</label>
      <div v-for="log in accessLog" v-bind:key="log">{{log.idx}}, {{log.createAt}}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      user: null,
      accessLog: []
    }
  },
  created () {
    axios.get('http://localhost:3000/me')
      .then(({data}) => (this.user = data.user[0], this.accessLog = data.accessLog))
      .catch(() => {
        this.$store.dispatch('LOGOUT').then(() => this.$router.push('/'))
      })
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <h4>Login</h4>
    <form>
      <label for="email">E-Mail Address</label>
      <div>
        <input id="email" type="email" v-model="email" required autofocus />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" required />
      </div>
      <div>
        <button type="submit" v-on:click="handleSubmit" value="Login" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleSubmit: e => {
      e.preventDefault()
      if (this.password.length > 0) {
        this.$http.post('http://localhost:3000/login', {
          email: this.email,
          password: this.password
        })
          .then(response => {
            console.log(response)
            let isAdmin = response.data.user.is_admin
            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('jwt', response.data.token)

            if (localStorage.getItem('jwt') != null) {
              this.$emit('loggedIn')
              if (this.$route.params.nextUrl != null) {
                this.$route.push(this.$route.params.nextUrl)
              } else {
                this.$route.push(isAdmin ? 'admin' : 'dashboard')
              }
            }
          })
          .catch(error => {
            console.error(error.response)
          })
      }
    }
  }
}
</script>

<style>

</style>

<template>
  <div>
    <h4>Register</h4>
    <div>
      <label for="name">Name</label>
      <input id="name" type="text" v-model="name" required/>
    </div>
    <div>
      <label for="email">E-Mail Address</label>
      <input id="email" type="email" v-model="email" required/>
    </div>
    <div>
      <label for="password">Password</label>
      <input id="password" type="password" v-model="password" required/>
    </div>
    <div>
      <label for="password-confirm">Confirm Password</label>
      <input id="password-confirm" type="password" v-model="passwordConfirmation" required/>
    </div>
    <div>
      <label for="is-admin">Is this an administrator account?</label>
      <select id="is-admin" v-model="is_admin">
        <option value="1">Yes</option>
        <option value="0">No</option>
      </select>
    </div>
    <div>
      <button type="submit" v-on:click="handleSubmit">Register</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      is_admin: 0
    }
  },
  methods: {
    handleSubmit (e) {

    }
  }
}
</script>

<style>

</style>

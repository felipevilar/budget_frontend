<template>
  <v-container
    class="mt-15"
    style="width: 500px; background-color: #2196f3"
    fluid
  >
    <v-card light class="pa-5" elevation="18">
      <v-container class="text-center pa-0 ma-0">
      <img src="~/assets/logo.png" width="50%" style=""/>
      </v-container>
      <h2 class="info--text">Login</h2>
      <v-form ref="form">
        <v-text-field
          v-model="user.email"
          label="E-mail"
          placeholder="root"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          label="Senha"
          placeholder="root"
          required
          type="password"
        ></v-text-field>

        <v-btn color="info" class="mr-4" @click="signin"> Entrar </v-btn>
        <v-btn color="grey" class="mr-4" @click="reset"> Limpar </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import { baseUrl, showError, userKey } from '@/global'

export default {
  data: () => ({
    showSignup: true,
    user: {},
  }),

  methods: {
    reset() {
      this.$refs.form.reset()
    },
    signin() {
      console.log('THIS USER: ' + JSON.stringify(this.user))
      axios
        .post(`${baseUrl}/signin`, this.user)
        .then((res) => {
          this.$store.dispatch('setUser', res.data)
          localStorage.setItem(userKey, JSON.stringify(res.data))
          this.$router.push({ path: '/' })
        })
        .catch(showError)
    },
    signup() {
      axios
        .post(`${baseUrl}/signup`, this.user)
        .then(() => {
          Vue.toast.success('Sucesso!')
          this.user = {}
          this.showSignup = false
        })
        .catch(showError)
    },
  },
}
</script>

<template>
  <v-container fluid>
    <v-form>
      <v-row>
        <v-col cols="6">
          <v-text-field outlined v-model="user.name" required label="Nome" />
        </v-col>
        <v-col cols="6">
          <v-text-field outlined v-model="user.email" required label="E-mail" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field
            outlined
            v-model="user.password"
            type="password"
            required
            label="Senha"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            outlined
            v-model="user.confirmPassword"
            type="password"
            required
            label="Confirme a senha"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-checkbox v-model="user.admin" label="Admin?"></v-checkbox></v-col
      ></v-row>
      <v-row>
        <v-col cols="12">
          <v-btn color="success" @click="save">Salvar</v-btn>
          <v-btn color="error" @click="reset">Limpar</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <UserList @loadUser="loadUsers" />
    </v-row>
  </v-container>
</template>

<script>
import { baseUrl, showError } from '@/global'
import axios from 'axios'
import UserList from '~/components/admin/users/UserList'
import Vue from 'vue'
export default {
  name: 'UserAdmin',
  components: { UserList },
  data() {
    return { user: {} }
  },
  methods: {
    reset() {
      this.user = {}
    },
    save() {
      this.$store
        .dispatch('saveUser', this.user)
        .then(() => {
          Vue.toasted.success('Sucesso!!')
          this.$store.dispatch('loadUsers')
          this.reset()
        })
        .catch(showError)
    },
    loadUsers(item) {
      this.user = item
    },
  },
}
</script>

<style></style>

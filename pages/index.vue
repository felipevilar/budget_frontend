<template>
  <div id="app">
<!--     <v-row>
      <v-col cols="12" md="3">
        <Stat
          title="Produtos"
          :value="stat.products"
          icon="mdi-package-variant"
          colorIcon="cyan lighten-3"
          color="green darken-3"
        />
      </v-col>
      <v-col cols="12" md="3">
        <Stat
          title="Categorias"
          :value="stat.categories"
          icon="mdi-folder"
          colorIcon="yellow lighten-3"
          color="lime darken-3"
        />
      </v-col>
      <v-col cols="12" md="3">
        <Stat
          title="Marcas"
          :value="stat.brands"
          icon="mdi-apple"
          colorIcon="red darken-2"
          color="purple darken-4"
        />
      </v-col>
      <v-col cols="12" md="3">
        <Stat
          title="Usuários"
          :value="stat.users"
          icon="mdi-account"
          colorIcon="white"
          color="blue-grey darken-3"
        />
      </v-col>
    </v-row> -->
  </div>
</template>

<script>
/* import Stat from '~/components/home/Stat' */
import axios from 'axios'
import { baseUrl } from '~/global'

/* require('axios').defaults.headers.common['Authorization'] =
  'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6IkZlbGlwZSIsImVtYWlsIjoiZmVsaXBlQDNjb3Jlb25saW5lLmNvbS5iciIsImFkbWluIjp0cnVlLCJpYXQiOjE2MDg1ODQ2NzIsImV4cCI6MTYwODkzMDI3Mn0.OonltgMJZSaTZj2fet477nixLH9YtPBylvXN78bgyd0' */

export default {
  name: 'App',
  components: { /* Stat */ },
  data() {
    return {
      stat: {},
    }
  },
  methods: {
    getStats() {
      console.log(baseUrl)
      axios
        .get(`${baseUrl}/stats`)
        .then((response) => (this.stat = response.data))
    },
  },
  mounted() {
    console.log('MOUNTED!!')
/*     this.getStats() */
  },
}
</script>

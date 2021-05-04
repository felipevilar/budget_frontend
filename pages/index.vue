<template>
  <div id="app">
    <div class="main-container">
      <div><img src="~/assets/logo.png" /></div>
      <h1>Bem-Vindo!</h1>
      <p>
        Bem-vindo ao <strong>Sistema de Orçamento</strong>! Você pode utiliza-lo
        para criar orçamentos para os clientes. O sistema calcula o custo e o
        lucro para cada produto no orçamento além do custo e lucro total,
        calculados em tempo real. Assim você não precisa de nenhum editor de
        texto/planilha e nem calculadora, economizando seu tempo preciosos.
      </p>
      <h1>Welcome!</h1>
      <p>
        Welcome to the <strong>Budget System!</strong> You can use it to create
        quotes for your customers. The system calculates the cost and profit for
        each product in the budget, in addition to the total cost and profit,
        calculated in real time. So you don't need any text / spreadsheet editor
        or calculator, saving you precious time.
      </p>
    </div>
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

export default {
  name: 'App',
  components: {
    /* Stat */
  },
  data() {
    return {
      stat: {},
    }
  },
  methods: {
    async getStats() {
      await axios
        .get(`${baseUrl}/stats`)
        .then((response) => (this.stat = response.data))
    },
  },
  mounted() {
    /*     this.getStats() */
  },
}
</script>
<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 750px;
  margin: 0 auto;
}

.main-container h1 {
  color: rgb(62, 177, 106);
}

.main-container img {
  width: 60%;
  display: flex;
  margin: 0 auto;
  margin-bottom: 20px;
}
</style>

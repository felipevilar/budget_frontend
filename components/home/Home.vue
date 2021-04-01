<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Dashboard"
            sub="Base de Conhecimento" />
<!--         <div class="stats">
            <Stat title="Produtos" :value="stat.products" icon="fa fa-dropbox" color="#3bc480" />
            <Stat title="Categorias" :value="stat.categories" icon="fa fa-folder" color="#d54d50" />
            <Stat title="Usuários" :value="stat.users" icon="fa fa-user" color="#3282cd" />
        </div> -->
    </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
/* import Stat from "./Stat"; */
import axios from "axios";
import { baseUrl } from "@/global";

export default {
  name: "Home",
  components: { PageTitle },
  data() {
    return {
      stat: {},
    };
  },
  methods: {
    getStats() {
      axios
        .get(`${baseUrl}/stats`)
        .then((response) => (this.stat = response.data));
    },
  },
  mounted() {
/*     this.getStats(); */
  },
};
</script>

<style>
</style>

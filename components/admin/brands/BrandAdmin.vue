<template>
  <v-container fluid>
    <v-form>
      <input id="brand-id" type="hidden" v-model="brand.id" />
      <v-row>
        <v-col cols="12">
          <v-text-field outlined v-model="brand.name" required label="Nome" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn color="success" @click="save">Salvar</v-btn>
          <v-btn color="error" @click="reset">Limpar</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <BrandList @loadBrand="loadBrand" />
    </v-row>
  </v-container>
</template>

<script>
import BrandList from '~/components/admin/brands/BrandList'
import Vue from 'vue'
import { baseUrl, showError } from '@/global'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'BrandAdmin',
  components: { BrandList },
  data: function () {
    return {
      brand: {},
    }
  },
  methods: {
    reset() {
      this.brand = {}
    },
    save() {
      this.$store
        .dispatch('saveBrand', this.brand)
        .then(() => {
          Vue.toasted.success('Sucesso!!')
          this.reset()
          this.$store.dispatch('loadBrands')
        })
        .catch(showError)
    },
    loadBrand(item) {
      this.brand = item
    },
  },
}
</script>

<style></style>

<template>
  <v-container fluid>
    <v-form>
      <input id="category-id" type="hidden" v-model="category.id" />
      <v-row>
        <v-col cols="6">
          <v-text-field
            filled
            v-model="category.name"
            required
            label="Nome"
          />
        </v-col>
        <v-col cols="6">
          <v-select
            filled
            :items="categories"
            item-text="path"
            item-value="id"
            v-model="category.parentId"
            label="Categoria Pai"
          ></v-select>
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
      <CategoryList @loadCategory="loadCategory" />
    </v-row>
  </v-container>
</template>

<script>
import CategoryList from '~/components/admin/categories/CategoryList'
import Vue from 'vue'
import { baseUrl, showError } from '@/global'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'CategoryAdmin',
  components: { CategoryList },
  data: function () {
    return {
      category: {},
    }
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories,
    }),
  },
  methods: {
    reset() {
      this.category = {}
    },
    save() {
      this.$store.dispatch('saveCategory', this.category).then( () => {
        Vue.toasted.success('Sucesso!!')
        this.$store.dispatch('loadCategories')
        this.reset()
      }).catch(showError)
    },
    loadCategory(item) {
      this.category = item
    },
  },
}
</script>

<style></style>

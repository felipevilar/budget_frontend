<template>
  <v-container fluid>
    <v-text-field
      filled
      v-model="search"
      append-icon="mdi-magnify"
      label="Buscar..."
      single-line
      hide-details
      class="ma-3 pa-3"
    ></v-text-field>

    <v-data-table
      :headers="headers"
      :items="products"
      sort-by="id"
      class="elevation-10"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Lista de Produtos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Quer mesmo deletar este item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon color="green" class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon color="red" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { baseUrl, showError } from '@/global'
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'ID',
        align: 'start',
        sortable: true,
        value: 'id',
      },
      { text: 'Nome', value: 'name' },
      { text: 'Modelo', value: 'model', sortable: true },
      { text: 'Marca', value: 'brandId', sortable: true },
      { text: 'Preço Compra', value: 'buyPrice', sortable: true },
      { text: 'Preço Venda', value: 'sellPrice', sortable: true },
      { text: 'Categoria', value: 'categoryId', sortable: true },
      { text: 'Quantidade', value: 'qtd', sortable: true },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: '',
      desc: '',
      model: '',
      buyPrice: 0,
      taxes: 0,
      sellPrice: 0,
      qtd: 0,
    },
    defaultItem: {
      name: '',
      desc: '',
      model: '',
      buyPrice: 0,
      taxes: 0,
      sellPrice: 0,
      qtd: 0,
    },
  }),
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.close()
    },
  },
  methods: {
    load() {
      this.$store.dispatch('loadProducts')
    },
    editItem(item) {
      this.editedIndex = Object.assign({}, item)
      this.$emit('loadProduct', this.editedIndex)
      this.dialog = false
    },

    deleteItem(item) {
      this.editedIndex = item
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.$store
        .dispatch('removeProduct', this.editedIndex.id)
        .then(() => {
          Vue.toasted.success('Sucesso!!')
          this.$store.dispatch('loadProducts')
        })
        .catch(showError)
      this.close()
      this.load()
    },

    close() {
      this.dialog = false
      this.dialogDelete = false
      this.editedItem = this.defaultItem
      this.editedIndex = -1
    },
  },
  computed: {
    ...mapState({
      products: (state) => state.products,
    }),
  },

  created() {
    this.load()
  },
}
</script>

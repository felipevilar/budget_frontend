<template>
  <v-container fluid>
    <v-text-field
      filled
      v-model="search"
      append-icon="mdi-magnify"
      label="Buscar..."
      single-line
      hide-details
      class="ma-5 pa-5"
    ></v-text-field>

    <v-data-table
      :headers="headers"
      :items="this.users"
      sort-by="id"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Lista de Marcas</v-toolbar-title>
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
      <template v-slot:no-data> </template>
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
      { text: 'Name', value: 'name', sortable: true },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: '',
    },
    defaultItem: {
      name: '',
    },
  }),

  computed: {
    ...mapState({
      users: (state) => state.users,
      user: (state) => state.user
    }),
  },

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
      this.$store.dispatch('loadUsers')
    },
    editItem(item) {
      this.editedIndex = Object.assign({}, item)
      this.$emit('loadUser', this.editedIndex)
      this.dialog = false
    },

    deleteItem(item) {
      this.editedIndex = item
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.$store
        .dispatch('removeUser', this.editedIndex.id)
        .then(() => {
          Vue.toasted.success('Sucesso!!')
          this.$store.dispatch('loadUsers')
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
  created() {
    this.load()
  },
}
</script>

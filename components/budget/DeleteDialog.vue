<template>
  <div>
    <v-icon color="deep-orange accent" @click="deleteItem(item)">
      mdi-delete
    </v-icon>

    <v-dialog v-model="dialogDelete" max-width="500px" :retain-focus="false">
      <v-card>
        <v-card-title class="headline"
          >Quer mesmo deletar este item?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete"
            >Cancelar</v-btn
          >
          <v-btn color="blue darken-1" text @click="deleteItemConfirm(item)"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['item', 'desserts'],
  data() {
    return {
      editedIndex: -1,
      dialogDelete: false,
    }
  },
  watch: {
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  methods: {
    deleteItem(items) {
      this.editedIndex = this.desserts.indexOf(items)
      this.dialogDelete = true
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedIndex = -1
      })
    },
    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },
  },
}
</script>

<style></style>

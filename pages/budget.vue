<template>
  <v-container fluid style="padding: 0px !important">
    <v-card v-show="printable" class="my-2" outlined color="grey darken-4">
      <v-row class="justify-left">
        <v-col cols="12" class="mx-4">
          <h5>3CORE SUPORTE EM TECNOLOGIA LTDA</h5>
          <h5>CNPJ: 24.512.565/0001-16</h5>
          <h5>Av Eduardo Ribeiro, 520 - Andar 13° Sala 1303 - Centro</h5>
          <h5>CEP: 69010-901</h5>
          <h5>Contato: (92)3084-4173 / central@3coreonline.com.br</h5>
          <h5>Manaus - Amazonas</h5>
        </v-col>
      </v-row>
    </v-card>

    <v-row v-if="!printable">
      <v-col cols="12" sm="11">
        <v-autocomplete
          label="Qual produto deseja adicionar?"
          class="mx-4"
          max-width="200px"
          v-if="!printable"
          v-model="select"
          :loading="loading"
          :items="items"
          item-text="name"
          item-value="id"
          prepend-inner-icon="mdi-magnify"
          :search-input.sync="search"
          clearable
          hide-selected
          chips
          deletable-chips
          cache-items
          multiple
          return-object
          filled
          @change="handleInsertion"
          @keydown.enter="addProduct"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" sm="1" class="mx-auto my-auto text-center">
        <v-btn icon v-if="!printable">
          <v-icon large color="success" @click="addProduct"
            >mdi-plus-box</v-icon
          >
        </v-btn>
      </v-col>
    </v-row>

    <!-- --------------------------------TABLE LIST------------------------------------->
    <v-data-table
      :headers="_headers"
      :items="desserts"
      :show-expand="!printable"
      calculate-widths
      hide-default-footer
      disable-pagination
      no-data-text="Adicione Produtos para Começar..."
      dense
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-divider horizontal class="my-3" color="#546E7A" />

          <v-simple-table>
            <template v-slot:default>
              <ExpandedProductView :item="item" />
            </template>
          </v-simple-table>

          <v-divider horizontal class="my-3" color="#546E7A" />
        </td>
      </template>

      <template v-slot:[`item.qtd`]="{ item }">
        <v-text-field
          v-model="item.qtd"
          dense
          width="50px"
          filled
          class="pt-2"
          required
          type="number"
        />
      </template>

      <template v-slot:[`item.discount`]="{ item }">
        <v-text-field
          v-model="item.discount"
          dense
          width="50px"
          filled
          prefix="%"
          class="pt-2"
        />
      </template>

      <template v-slot:[`item.cost`]="{ item }">
        {{ formatter.format(item.cost) }}
      </template>

      <template v-slot:[`item.total`]="{ item }">
        {{ setItemTotal(item) }}
      </template>

      <template v-slot:[`item.sellPrice`]="{ item }">
        <v-text-field
          v-model="item.sellPrice"
          dense
          filled
          class="pt-2"
          required
          prefix="R$"
        />
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <DeleteDialog :item="item" :desserts="desserts" />
      </template>

      <template slot="footer">
        <v-divider horizontal class="py-2" />
        <td :colspan="headers.length + 1" v-show="this.desserts.length > 0">
          <v-divider horizontal class="py-2 warning" />
          <v-simple-table dark>
            <template v-slot:default>
              <FooterBudget :item="desserts" :printable="printable" />
            </template>
          </v-simple-table>
        </td>
      </template>
    </v-data-table>

    <v-btn v-show="this.btnPrint" class="my-8" color="success" @click="print()"
      >Imprimir</v-btn
    >
    <v-btn
      v-show="this.btnPrint && this.printable"
      class="my-2 mx-2"
      color="error"
      @click="printBack()"
      >Voltar</v-btn
    >
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { formatter, formatterNum } from '@/global'
import ExpandedProductView from '~/components/budget/ExpandedProductView'
import FooterBudget from '~/components/budget/FooterBudget'
import DeleteDialog from '~/components/budget/DeleteDialog'

export default {
  name: 'Budget',
  components: { ExpandedProductView, FooterBudget, DeleteDialog },

  mounted() {
    this.$store.dispatch('loadProducts')
    if (this.loaded.length > 0) this.desserts = [...this.loaded]
  },

  beforeDestroy() {
    this.$store.dispatch('saveBud', this.desserts)
  },

  data() {
    return {
      printable: false,
      btnPrint: true,
      formatter,
      formatterNum,
      loading: false,
      search: null,
      select: null,
      desserts: [],
      headers: [
        {
          text: 'Nome',
          align: 'start',
          sortable: false,
          value: 'name',
          show: true,

        },
        { text: 'Modelo', value: 'model' },
        { text: 'Custo', value: 'cost' },
        { text: 'Qtd', value: 'qtd'},
        { text: 'Preço (R$)', value: 'sellPrice' },
        { text: 'Desconto (%)', value: 'discount' },
        { text: 'Total', value: 'total' },
        { text: 'Ações', value: 'actions' },
      ],
    }
  },
  computed: {
    ...mapState({
      items: (state) => state.products,
      loaded: (state) => state.loaded,
    }),
      includedIds() {
        return this.desserts.map((el) => el.id)
      },
    _headers() {
      if (this.printable)
        return this.headers.filter(
          (header) => header.text !== 'Custo' && header.text !== 'Ações'
        )
      return this.headers
    },
  },
  watch: {
    search(val) {
      val && val !== this.select
    },
  },
  methods: {
    handleInsertion(e) {
      this.search = null;
    },
    print() {
      const self = this
      self.printable = true
      self.btnPrint = false
      self.$store.dispatch('toogleMenuOff')
      self.btnPrint = false
      setTimeout(() => window.print(), 100)
      setTimeout(() => (self.btnPrint = true), 200)
    },
    printBack() {
      this.printable = false
      this.$store.dispatch('toogleMenuOn')
    },
    addProduct() {
      console.log("addProduct()");
      if (this.select) {
        this.select.map((el) => {
          if (this.includedIds.indexOf(el.id) === -1) {
            let cost = el.buyPrice * (el.taxes / 100 + 1)
            
            return this.desserts.push({
              ...el,
              cost: Number(cost.toFixed(2)),
              total: 0,
              discount: 0,
              qtd: 1,
            })
          }
        })
        this.select = null
      }
    },
    setItemTotal(item) {
      let discount = (item.discount / 100) * item.sellPrice
      item.total = item.qtd * (item.sellPrice - discount)
      return formatter.format(item.total)
    },
  },
}
</script>

<style>
.theme--dark.v-data-table tbody tr:nth-of-type(even) {
  background-color: rgb(51, 51, 51);
}
.theme--dark.v-data-table tbody tr:nth-of-type(odd) {
  background-color: rgb(59, 59, 59);
}
</style>

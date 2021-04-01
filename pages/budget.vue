<template>
  <v-container fluid style="padding: 0px !important">
    <v-card v-show="printable" class="my-2" outlined color="grey darken-4">
      <v-row class="justify-left">
        <!--         <v-col cols="2" class="pr-0 mr-0 my-auto">
          <v-img
            class="mx-auto"
            max-height="150"
            max-width="150"
            contain
            :src="require('@/assets/marca_topper.png')"
          ></v-img>
        </v-col> -->
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
    <v-row>
      <v-col cols="12" sm="11">
        <v-autocomplete
          v-model="select"
          :loading="loading"
          :items="items"
          item-text="name"
          item-value="id"
          prepend-icon="mdi-magnify"
          clearable
          :search-input.sync="search"
          cache-items
          class="mx-4"
          flat
          hide-no-data
          hide-details
          max-width="200px"
          multiple
          return-object
          label="Qual produto deseja adicionar?"
          solo-inverted
          @keydown="addProduct"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="1" class="mx-auto my-auto text-center">
        <v-btn icon>
          <v-icon large color="success" @click="addProduct">mdi-plus-box</v-icon>
          
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
              <tbody>
                <tr>
                  <td style="width: 150px">
                    <v-icon left color="red accent-1">mdi-cash-remove</v-icon
                    >Custo (Und)
                  </td>
                  <td>{{ formatter.format(item.cost) }}</td>
                </tr>
                <tr>
                  <td>
                    <v-icon left color="grey">mdi-cart</v-icon>Custo Total
                  </td>
                  <td>{{ formatter.format(item.qtd * item.cost) }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-divider horizontal class="my-1" color="#546E7A" />

          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td style="width: 150px">
                    <v-icon left color="green accent-1">mdi-cash-plus</v-icon
                    >Lucro (Und)
                  </td>
                  <td style="width: 100px">
                    {{
                      formatter.format(
                        calcProfit(item.sellPrice, item.cost, true)
                      )
                    }}
                  </td>
                  <td>
                    {{
                      formatterNum.format(
                        calcProfit(item.sellPrice, item.cost, false)
                      )
                    }}%
                  </td>
                </tr>
                <tr>
                  <td>
                    <v-icon left color="grey">mdi-cart</v-icon>Lucro Total
                  </td>
                  <td>
                    {{
                      formatter.format(
                        item.qtd * calcProfit(item.sellPrice, item.cost, true)
                      )
                    }}
                  </td>
                  <td>
                    {{
                      formatterNum.format(
                        item.qtd * calcProfit(item.sellPrice, item.cost, false)
                      )
                    }}%
                  </td>
                </tr>
              </tbody>
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
          outlined
          class="pt-2"
          required
          type="number"
        />
      </template>

      <template v-slot:[`item.cost`]="{ item }">
        {{ formatter.format(item.cost) }}
      </template>

      <template v-slot:[`item.total`]="{ item }">
        {{ formatter.format(item.qtd * item.sellPrice.replace(/,/g, '.')) }}
      </template>

      <template v-slot:[`item.sellPrice`]="{ item }">
        <v-text-field
          v-model="item.sellPrice"
          dense
          outlined
          class="pt-2"
          required
          prefix="R$"
        />
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon color="deep-orange accent" @click="deleteItem(item)">
          mdi-delete
        </v-icon>

        <v-dialog
          v-model="dialogDelete"
          max-width="500px"
          :retain-focus="false"
        >
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
      </template>

      <template slot="footer">
        <v-divider horizontal class="py-2" />
        <td :colspan="headers.length + 1" v-show="this.desserts.length > 0">
          <v-divider horizontal class="py-2 warning" />
          <v-simple-table dark>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td><v-icon left color="warning">mdi-cart</v-icon>Total</td>
                  <td>{{ formatter.format(sumTotal('sellPrice', 'qtd')) }}</td>
                  <td></td>
                </tr>
                <tr v-show="!printable">
                  <td>
                    <v-icon left color="green accent-1">mdi-cash</v-icon>Lucro
                  </td>
                  <td>
                    {{
                      formatter.format(sumProfit('sellPrice', 'cost', 'qtd'))
                    }}
                  </td>
                  <td>
                    {{
                      formatterNum.format(
                        sumProfitPercent(
                          sumProfit('sellPrice', 'cost', 'qtd'),
                          sumCost('cost', 'qtd')
                        )
                      )
                    }}%
                  </td>
                </tr>
                <tr v-show="!printable">
                  <td>
                    <v-icon left color="red accent-1">mdi-cash-remove</v-icon
                    >Custo Total
                  </td>
                  <td>{{ formatter.format(sumCost('cost', 'qtd')) }}</td>
                  <td></td>
                </tr>
              </tbody>
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

export default {
  name: 'Budget',
  mounted() {
    if (this.items.length == 0) this.$store.dispatch('loadProducts')
  },
  data() {
    return {
      printable: false,
      btnPrint: true,
      formatter,
      formatterNum,
      loading: false,
      dialogDelete: false,
      search: null,
      select: null,
      desserts: [],
      pagination: {},
      headers: [
        {
          text: 'Nome',
          align: 'start',
          sortable: false,
          value: 'name',
          show: true,
          width: '30%',
        },
        { text: 'Modelo', value: 'model' },
        { text: 'Custo', value: 'cost' },
        { text: 'Quantidade', value: 'qtd', width: '5%' },
        { text: 'Preço (R$)', value: 'sellPrice' },
        { text: 'Total', value: 'total' },
        { text: 'Ações', value: 'actions' },
      ],
      editedIndex: -1,
    }
  },
  computed: {
    ...mapState({
      items: (state) => {
        return state.products.map((el) => {
          let cost = el.buyPrice * (el.taxes / 100 + 1)
          let profit = ((el.sellPrice - cost) / cost) * 100
          return {
            ...el,
            cost: Number(cost.toFixed(2)),
            profit: Number(profit.toFixed(2)),
            total: 0,
            qtd: 1,
          }
        })
      },
      includedIds() {
        return this.desserts.map((el) => el.id)
      },
      _headers() {
        if (this.printable) {
          return this.headers.filter(
            (x) => x.text !== 'Custo' && x.text !== 'Ações'
          )
        }
        return this.headers
      },
    }),
  },
  watch: {
    search(val) {
      val && val !== this.select
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  methods: {
    print() {
      const self = this
      this.printable = true
      this.btnPrint = false
      this.$store.dispatch('toogleMenuOff')
      this.btnPrint = false
      setTimeout(() => window.print(), 100)
      setTimeout(() => (self.btnPrint = true), 200)
    },
    printBack() {
      this.printable = false
      this.$store.dispatch('toogleMenuOn')
    },
    addProduct() {
      console.log('includedId: ' + this.includedIds)
      if (this.select) {
        this.select.map((el) => {
          if (this.includedIds.indexOf(el.id) === -1)
            return this.desserts.push(el)
        })
        this.select = null
      }
    },

    sumTotal(key, qtd) {
      // sum data in give key (property)
      return this.desserts.reduce(
        (a, b) => a + (Number(b[key]) * Number(b[qtd]) || 0),
        0
      )
    },
    sumProfit(sellPrice, cost, qtd) {
      // sum data in give key (property)
      return this.desserts.reduce(
        (a, b) =>
          a + (Number(b[qtd]) * (Number(b[sellPrice]) - Number(b[cost])) || 0),
        0
      )
    },
    sumProfitPercent(profit, cost) {
      // sum data in give key (property)
      return (profit / cost) * 100
    },
    sumCost(cost, qtd) {
      // sum data in give key (property)
      return this.desserts.reduce(
        (a, b) => a + (Number(b[cost]) * Number(b[qtd]) || 0),
        0
      )
    },
    calcProfit(sellPrice, cost, flag) {
      return flag ? sellPrice - cost : ((sellPrice - cost) / cost) * 100
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.dialogDelete = true
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedIndex = -1
      })
    },
    deleteItemConfirm(item) {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
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

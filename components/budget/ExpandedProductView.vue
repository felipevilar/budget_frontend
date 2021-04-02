<template>
  <v-simple-table>
    <tbody>
      <tr>
        <td style="width: 150px">
          <v-icon left color="red accent-1">mdi-cash-remove</v-icon>Custo (Und)
        </td>
        <td>{{ formatter.format(item.cost) }}</td>
        <td></td>
      </tr>
      <tr>
        <td><v-icon left color="grey">mdi-cart</v-icon>Custo Total</td>
        <td>{{ formatter.format(item.qtd * item.cost) }}</td>
        <td></td>
      </tr>
      <tr>
        <td style="width: 150px">
          <v-icon left color="green accent-1">mdi-cash-plus</v-icon>Lucro (Und)
        </td>
        <td style="width: 100px">
          {{ formatter.format(calcProfit(item.sellPrice, item.discount, item.cost, true)) }}
        </td>
        <td>
          {{
            formatterNum.format(calcProfit(item.sellPrice, item.discount, item.cost, false))
          }}%
        </td>
      </tr>
      <tr>
        <td><v-icon left color="grey">mdi-cart</v-icon>Lucro Total</td>
        <td>
          {{
            formatter.format(
              item.qtd * calcProfit(item.sellPrice, item.discount, item.cost, true)
            )
          }}
        </td>
        <td>
          {{
            formatterNum.format(calcProfit(item.sellPrice, item.discount, item.cost, false))
          }}%
        </td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
import { formatter, formatterNum } from '@/global'
export default {
  props: ['item'],
  name: 'ExpandedProductView',
  data() {
    return {
      formatter,
      formatterNum,
    }
  },
  methods: {
    calcProfit(sellPrice, discount, cost, currency) {
      let calcDiscount = sellPrice*(discount / 100)
      let realPrice = sellPrice - cost - calcDiscount
      let percentPrice = (realPrice/cost) * 100
      
      return (currency) ? realPrice : percentPrice
    },
  },
}
</script>

<style></style>

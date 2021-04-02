<template>
  <tbody>
    <tr>
      <td><v-icon left color="warning">mdi-cart</v-icon>Total</td>
      <td>{{ formatter.format(sumTotal('total')) }}</td>
      <td></td>
    </tr>
    <tr v-show="!printable">
      <td><v-icon left color="green accent-1">mdi-cash</v-icon>Lucro</td>
      <td>
        {{ formatter.format(sumProfit('total', 'cost', 'qtd')) }}
      </td>
      <td>
        {{
          formatterNum.format(
            sumProfitPercent(
              sumProfit('total', 'cost', 'qtd'),
              sumCost('cost', 'qtd')
            )
          )
        }}%
      </td>
    </tr>
    <tr v-show="!printable">
      <td>
        <v-icon left color="red accent-1">mdi-cash-remove</v-icon>Custo Total
      </td>
      <td>{{ formatter.format(sumCost('cost', 'qtd')) }}</td>
      <td></td>
    </tr>
  </tbody>
</template>

<script>
import { formatter, formatterNum } from '@/global'
export default {
  name: 'FooterBudget',
  props: ['item', 'printable'],
  data() {
    return {
      formatter,
      formatterNum,
    }
  },
  methods: {
    sumTotal(key) {
      // sum data in give key (property)
      return this.item.reduce(
        (a, b) => a + (Number(b[key]) || 0),
        0
      )
    },
    sumProfit(total, cost, qtd) {
      // sum data in give key (property)
      return this.item.reduce(
        (a, b) =>
          a + (Number(b[total] - Number(b[qtd])*Number(b[cost])) || 0),
        0
      )
    },
    sumProfitPercent(profit, cost) {
      // sum data in give key (property)
      return (profit / cost) * 100
    },
    sumCost(cost, qtd) {
      // sum data in give key (property)
      return this.item.reduce(
        (a, b) => a + (Number(b[cost]) * Number(b[qtd]) || 0),
        0
      )
    },
    calcProfit(sellPrice, cost, flag) {
      return flag ? sellPrice - cost : ((sellPrice - cost) / cost) * 100
    },
  },
}
</script>

<style></style>

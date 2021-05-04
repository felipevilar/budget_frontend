import Vue from 'vue'

/* export const baseUrl = 'http://localhost:4000' */

export const baseUrl = 'https://backend-budget.herokuapp.com'

export function showError(e) {
  if (e && e.response && e.response.data) {
    console.log('ERROR1: ' + JSON.stringify(e))
    Vue.toasted.error(e.response.data)
  } else if (typeof e === 'string') {
    console.log('ERROR2: ' + JSON.stringify(e))
    Vue.toasted.error(e.response.data)
  } else {
    console.log('ERROR3: ' + JSON.stringify(e.response.data))
    Vue.toasted.error(e.response.data)
  }
}

// Create our number formatter.
export const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const formatterNum = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function calcProfit(sellPrice, buyPrice, taxes, options) {
  let cost = buyPrice + taxes
  let profit = sellPrice - cost
  if (options) {
    return formatter.format(profit)
  }
  return formatterNum.format((profit / cost) * 100) + '%'
}

export const userKey = '__sys_user'
export default {
  baseUrl,
  showError,
  formatter,
  formatterNum,
  calcProfit,
  userKey,
}

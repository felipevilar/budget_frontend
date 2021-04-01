import { formatter, formatterNum } from '@/global'

export function calcProfit(sellPrice, buyPrice, taxes, options) {
    let cost = (buyPrice + taxes)
    let profit = sellPrice - cost
    if(options) {
      return formatter.format(profit)
    }
    return formatterNum.format(profit/cost*100)+"%"
  }

  export default { calcProfit }
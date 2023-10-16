import getSymbolFromCurrency from 'currency-symbol-map'

export default function formatAmount(amount: number, currencyCode: string = 'usd', trimZero: boolean = true) {
  const currencySymbol = getSymbolFromCurrency(currencyCode)
  let result = (amount / 100).toFixed(2)

  // Remove .00 at the end
  if (trimZero && result.endsWith('.00')) {
    result = result.substring(0, result.length - 3)
  }

  return `${currencySymbol}${result}`
}

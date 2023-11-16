/* eslint-disable @typescript-eslint/explicit-function-return-type */
function formatCurrency (amount: number | bigint) {
  const options = { style: 'currency', currency: 'TRY' }
  const formattedPrice = new Intl.NumberFormat('tr-TR', options).format(amount)

  return formattedPrice
}

export default formatCurrency

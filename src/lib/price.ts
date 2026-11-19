import type { Price } from '../data/menu'

const grouping = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })

/** Format LBP amounts with Western digits and thousands separators, e.g. "150,000 / 200,000". */
export function formatAmounts(price: Price): string | null {
  if (price === null) return null
  const amounts = typeof price === 'number' ? [price] : price
  return amounts.map((a) => grouping.format(a)).join(' / ')
}

import type { Price } from '../data/menu'
import { formatAmounts } from '../lib/price'
import { useLanguage } from '../i18n/LanguageProvider'

type Props = { price: Price; className?: string; currencyClassName?: string }

/**
 * Renders an LBP price. Digits are isolated as LTR so multi-price values
 * ("150,000 / 200,000") never reorder inside Arabic text. Missing prices
 * render as an em dash with an accessible label.
 */
export function PriceTag({ price, className = '', currencyClassName = '' }: Props) {
  const { t } = useLanguage()
  const amounts = formatAmounts(price)

  if (amounts === null) {
    return (
      <span className={className}>
        <span aria-hidden="true">—</span>
        <span className="sr-only">{t.a11y.priceUnavailable}</span>
      </span>
    )
  }

  return (
    <span className={`whitespace-nowrap tabular-nums ${className}`}>
      <bdi dir="ltr">{amounts}</bdi> <span className={currencyClassName}>{t.menu.currency}</span>
    </span>
  )
}

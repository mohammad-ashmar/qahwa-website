/**
 * QAHWA — official menu data (single source of truth).
 *
 * Source: references/11.jpeg (latest printed menu). Spellings follow the
 * printed menu exactly (e.g. "Verry Berries", "Halumi Salad").
 *
 * HOW TO UPDATE
 * - Change a price: edit the `price` field. Prices are plain LBP integers and
 *   are shared by both languages — never duplicate them in translations.
 * - Price unavailable: set `price: null` (renders as an em dash).
 * - Multiple prices (e.g. Cookies): use an array, e.g. `[150000, 200000]`.
 * - Add a product: append an item with a unique `id`, an English name (the
 *   source of truth) and its Arabic name.
 * - Run `npm run validate:menu` after editing.
 */

export type Localized = { en: string; ar: string }

/** LBP amount, a list of LBP amounts, or `null` when the price is unavailable. */
export type Price = number | readonly number[] | null

export type MenuItem = {
  id: string
  name: Localized
  price: Price
  signature?: boolean
}

export type MenuCategory = {
  id: string
  name: Localized
  items: MenuItem[]
}

const item = (
  id: string,
  en: string,
  ar: string,
  price: Price,
  extra: Partial<Pick<MenuItem, 'signature'>> = {},
): MenuItem => ({ id, name: { en, ar }, price, ...extra })

export const menu: MenuCategory[] = [
  {
    id: 'coffee',
    name: { en: 'Coffee', ar: 'قهوة' },
    items: [
      item('espresso', 'Espresso', 'إسبريسو', 70000),
      item('doppio', 'Doppio', 'دوبيو', 140000),
      item('espresso-macchiato', 'Espresso Macchiato', 'إسبريسو ماكياتو', 150000),
      item('americano', 'Americano', 'أمريكانو', 120000),
    ],
  },
  {
    id: 'latte',
    name: { en: 'Latte', ar: 'لاتيه' },
    items: [
      item('cappuccino-latte', 'Cappuccino Latte', 'كابتشينو لاتيه', 300000),
      item('vanilla-latte', 'Vanilla Latte', 'فانيلا لاتيه', 300000),
      item('white-mocha-latte', 'White Mocha Latte', 'وايت موكا لاتيه', 300000),
      item('caramel-latte', 'Caramel Latte', 'كراميل لاتيه', 300000),
      item('hazelnut-latte', 'Hazelnut Latte', 'لاتيه بالبندق', 300000),
      item('spanish-latte', 'Spanish Latte', 'سبانش لاتيه', 300000),
      item('honey-latte', 'Honey Latte', 'لاتيه بالعسل', 300000),
    ],
  },
  {
    id: 'iced-coffee',
    name: { en: 'Iced Coffee', ar: 'قهوة مثلّجة' },
    items: [
      item('iced-latte', 'Iced Latte', 'آيس لاتيه', 350000),
      item('iced-caramel', 'Caramel', 'كراميل', 350000),
      item('iced-vanilla', 'Vanilla', 'فانيلا', 350000),
      item('iced-mocha', 'Mocha', 'موكا', 350000),
      item('iced-spanish', 'Spanish', 'سبانش', 350000),
      item('lotus-iced-coffee', 'Lotus Iced Coffee', 'آيس كوفي لوتس', 350000),
      item('honey-iced-coffee', 'Honey Iced Coffee', 'آيس كوفي بالعسل', 350000),
    ],
  },
  {
    id: 'frappe',
    name: { en: 'Frappe', ar: 'فرابيه' },
    items: [
      item('dulce-qahwa', 'Dulce Qahwa', 'دولسي قهوة', 400000, { signature: true }),
      item('frappe-caramel', 'Caramel', 'كراميل', 400000),
      item('frappe-mocha', 'Mocha', 'موكا', 400000),
      item('frappe-vanilla', 'Vanilla', 'فانيلا', 400000),
      item('frappe-white-mocha', 'White Mocha', 'وايت موكا', 400000),
      item('frappe-hazelnut', 'Hazelnut', 'بندق', 400000),
    ],
  },
  {
    id: 'smoothie',
    name: { en: 'Smoothie', ar: 'سموذي' },
    items: [
      item('smoothie-mango', 'Mango', 'مانغو', 350000),
      item('smoothie-strawberry', 'Strawberry', 'فراولة', 350000),
      item('peach-passion', 'Peach Passion', 'دراق باشن', 350000),
      item('verry-berries', 'Verry Berries', 'ڤيري بيريز', 350000),
      item('blue-lemonade', 'Blue Lemonade', 'بلو ليموناضة', 350000),
    ],
  },
  {
    id: 'milkshake',
    name: { en: 'Milkshake', ar: 'ميلك شيك' },
    items: [
      item('double-chocolate', 'Double Chocolate', 'دبل شوكولا', 400000),
      item('milkshake-strawberry', 'Strawberry', 'فراولة', 400000),
      item('milkshake-vanilla', 'Vanilla', 'فانيلا', 400000),
      item('oreo', 'Oreo', 'أوريو', 400000),
      item('milkshake-caramel', 'Caramel', 'كراميل', 400000),
      item('mix-berries', 'Mix Berries', 'ميكس بيريز', 400000),
      item('milkshake-lotus', 'Lotus', 'لوتس', 400000),
      item('tutti-frutti', 'Tutti Frutti', 'توتي فروتي', 400000),
    ],
  },
  {
    id: 'matcha',
    name: { en: 'Matcha', ar: 'ماتشا' },
    items: [
      item('matcha-latte', 'Matcha Latte', 'ماتشا لاتيه', 450000),
      item('matcha-iced', 'Matcha Iced', 'ماتشا آيس', 450000),
      item('matcha-strawberry', 'Matcha Strawberry', 'ماتشا فراولة', 450000),
      item('matcha-mango', 'Matcha Mango', 'ماتشا مانغو', 450000),
    ],
  },
  {
    id: 'dessert',
    name: { en: 'Dessert', ar: 'حلويات' },
    items: [
      item('rez-bhalib', 'Rez Bhalib', 'رز بحليب', 150000),
      item('mhalabeye', 'Mhalabeye', 'مهلبية', 150000),
      item('jello', 'Jello', 'جيلو', 100000),
      item('custard', 'Custard', 'كاسترد', 100000),
      item('brownies', 'Brownies', 'براونيز', null),
      item('donuts', 'Donuts', 'دونات', null),
      item('cookies', 'Cookies', 'كوكيز', [150000, 200000]),
    ],
  },
  {
    id: 'salad',
    name: { en: 'Salad', ar: 'سلطات' },
    items: [
      item('caesar-salad', 'Caesar Salad', 'سلطة سيزر', null),
      item('halumi-salad', 'Halumi Salad', 'سلطة حلّوم', null),
      item('green-salad', 'Green Salad', 'سلطة خضراء', null),
      item('tuna-salad', 'Tuna Salad', 'سلطة تونا', null),
    ],
  },
  {
    id: 'iced-tea',
    name: { en: 'Iced Tea', ar: 'شاي مثلّج' },
    items: [
      item('iced-tea-peach-passion', 'Peach & Passion', 'دراق وباشن', 350000),
      item('iced-tea-peach', 'Peach', 'دراق', 350000),
    ],
  },
]

/** The signature product, derived from the data rather than hard-coded. */
export const signatureItem = menu
  .flatMap((c) => c.items.map((i) => ({ ...i, category: c })))
  .find((i) => i.signature)!

/** Products highlighted in the Featured section (ids must exist above). */
export const featuredIds = ['spanish-latte', 'lotus-iced-coffee', 'matcha-strawberry', 'oreo'] as const

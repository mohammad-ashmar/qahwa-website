/**
 * Validates src/data/menu.ts against an independent transcription of the
 * official printed menu (references/11.jpeg). Run: npm run validate:menu
 *
 * Requires Node 22.18+ / 23.6+ (native TypeScript type stripping).
 */
import { menu, signatureItem, featuredIds } from '../src/data/menu.ts'

// Transcribed from references/11.jpeg. null = dash on the printed menu.
const OFFICIAL = {
  Coffee: [['Espresso', 70000], ['Doppio', 140000], ['Espresso Macchiato', 150000], ['Americano', 120000]],
  Latte: [
    ['Cappuccino Latte', 300000], ['Vanilla Latte', 300000], ['White Mocha Latte', 300000], ['Caramel Latte', 300000],
    ['Hazelnut Latte', 300000], ['Spanish Latte', 300000], ['Honey Latte', 300000],
  ],
  'Iced Coffee': [
    ['Iced Latte', 350000], ['Caramel', 350000], ['Vanilla', 350000], ['Mocha', 350000], ['Spanish', 350000],
    ['Lotus Iced Coffee', 350000], ['Honey Iced Coffee', 350000],
  ],
  Frappe: [['Dulce Qahwa', 400000], ['Caramel', 400000], ['Mocha', 400000], ['Vanilla', 400000], ['White Mocha', 400000], ['Hazelnut', 400000]],
  Smoothie: [['Mango', 350000], ['Strawberry', 350000], ['Peach Passion', 350000], ['Verry Berries', 350000], ['Blue Lemonade', 350000]],
  Milkshake: [
    ['Double Chocolate', 400000], ['Strawberry', 400000], ['Vanilla', 400000], ['Oreo', 400000], ['Caramel', 400000],
    ['Mix Berries', 400000], ['Lotus', 400000], ['Tutti Frutti', 400000],
  ],
  Matcha: [['Matcha Latte', 450000], ['Matcha Iced', 450000], ['Matcha Strawberry', 450000], ['Matcha Mango', 450000]],
  Dessert: [
    ['Rez Bhalib', 150000], ['Mhalabeye', 150000], ['Jello', 100000], ['Custard', 100000], ['Brownies', null], ['Donuts', null],
    ['Cookies', [150000, 200000]],
  ],
  Salad: [['Caesar Salad', null], ['Halumi Salad', null], ['Green Salad', null], ['Tuna Salad', null]],
  'Iced Tea': [['Peach & Passion', 350000], ['Peach', 350000]],
}

const errors = []
const fail = (msg) => errors.push(msg)
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

const officialCats = Object.keys(OFFICIAL)
if (menu.length !== officialCats.length) fail(`Expected ${officialCats.length} categories, found ${menu.length}`)

const ids = new Set()
let itemCount = 0
for (const [ci, name] of officialCats.entries()) {
  const cat = menu.find((c) => c.name.en === name)
  if (!cat) {
    fail(`Missing category: ${name}`)
    continue
  }
  if (menu[ci] !== cat) fail(`Category "${name}" is out of order`)
  if (!cat.name.ar?.trim()) fail(`Category "${name}" has no Arabic name`)
  const expected = OFFICIAL[name]
  if (cat.items.length !== expected.length) fail(`${name}: expected ${expected.length} items, found ${cat.items.length}`)
  expected.forEach(([en, price], i) => {
    const item = cat.items[i]
    if (!item) return fail(`${name}: missing "${en}"`)
    if (item.name.en !== en) fail(`${name} #${i + 1}: expected "${en}", found "${item.name.en}"`)
    if (!same(item.price, price)) fail(`${name} / ${en}: expected price ${JSON.stringify(price)}, found ${JSON.stringify(item.price)}`)
    if (!item.name.ar?.trim()) fail(`${name} / ${en}: missing Arabic name`)
    if (ids.has(item.id)) fail(`Duplicate id: ${item.id}`)
    ids.add(item.id)
    itemCount++
  })
}

const signatures = menu.flatMap((c) => c.items.filter((i) => i.signature).map((i) => `${c.name.en}/${i.name.en}`))
if (!same(signatures, ['Frappe/Dulce Qahwa'])) fail(`Signature must be exactly Frappe/Dulce Qahwa, found ${signatures.join(', ') || 'none'}`)
if (signatureItem?.name.en !== 'Dulce Qahwa') fail('signatureItem does not resolve to Dulce Qahwa')
for (const id of featuredIds) if (!ids.has(id)) fail(`Featured id not found in menu: ${id}`)

const cookies = menu.find((c) => c.id === 'dessert')?.items.find((i) => i.id === 'cookies')
if (!same(cookies?.price, [150000, 200000])) fail('Cookies must keep the two-price representation 150,000 / 200,000')

if (errors.length) {
  console.error(`✗ Menu validation failed (${errors.length}):\n  - ${errors.join('\n  - ')}`)
  process.exit(1)
}
const unavailable = menu.flatMap((c) => c.items).filter((i) => i.price === null).length
console.log(`✓ Menu valid: ${menu.length} categories, ${itemCount} items, ${unavailable} without a listed price, signature = Dulce Qahwa (Frappe), Cookies = 150,000 / 200,000 LBP`)

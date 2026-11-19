/** English UI copy. The shape of this object defines the `Dictionary` type. */
export const en = {
  meta: {
    title: 'QAHWA | Coffee, Drinks & Desserts',
    description:
      'QAHWA is a coffee shop in Nabatieh, Lebanon. Explore the full menu of coffee, lattes, iced drinks, frappes, smoothies, milkshakes, matcha and desserts.',
  },
  a11y: {
    skip: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    langGroup: 'Language',
    primaryNav: 'Primary',
    footerNav: 'Footer',
    logoHome: 'QAHWA — back to top',
    newTab: '(opens in a new tab)',
    priceUnavailable: 'Price unavailable',
    categories: 'Menu categories',
  },
  nav: {
    home: 'Home',
    about: 'About',
    menu: 'Menu',
    gallery: 'Gallery',
    instagram: 'Instagram',
  },
  hero: {
    eyebrow: 'Coffee · Drinks · Desserts',
    place: 'Nabatieh, Lebanon',
    titleA: 'More than coffee.',
    titleB: 'A moment to yourself.',
    lede: 'Discover the world of QAHWA — from carefully crafted coffee to refreshing drinks and sweet moments.',
    ctaMenu: 'Explore the menu',
    ctaInstagram: 'Follow on Instagram',
  },
  about: {
    index: '01',
    label: 'About QAHWA',
    statementA: 'A small ritual,',
    statementB: 'poured slowly.',
    body: [
      'QAHWA is a coffee shop in Nabatieh — a place to pause, whether that means a short espresso, a cold glass on a warm afternoon, or something sweet to share.',
      'From classic coffee and lattes to frappes, smoothies, matcha and desserts, the menu is made for every kind of moment.',
    ],
  },
  featured: {
    index: '02',
    label: 'Featured',
    title: 'From the menu',
    signatureLabel: 'Signature',
    signatureNote: 'The house signature frappe.',
    signatureCta: 'See all frappes',
    alsoLabel: 'Worth trying',
    categoryLabel: 'Category',
    priceLabel: 'Price',
  },
  menu: {
    index: '03',
    label: 'The Menu',
    title: 'Everything we serve',
    intro: 'Ten categories, from a single espresso to dessert. All prices in Lebanese pounds.',
    items: (n: number) => `${n} ${n === 1 ? 'item' : 'items'}`,
    signature: 'Signature',
    currency: 'LBP',
    note: 'Prices in Lebanese pounds (LBP). A dash means the price is not listed.',
  },
  gallery: {
    index: '04',
    label: 'Gallery',
    title: 'The QAHWA experience',
    intro: 'Coffee, colour and a little sweetness — the atmosphere we love.',
    illustrative: 'Illustrative photography',
    captions: ['Espresso', 'Slow mornings', 'Iced', 'Something sweet', 'Craft', 'Together'],
  },
  instagram: {
    index: '05',
    label: 'Instagram',
    title: 'Follow the daily pour',
    body: 'New drinks, quiet moments and everything happening at QAHWA — on Instagram.',
    cta: 'Follow on Instagram',
    handle: '@qahwa.nab',
  },
  footer: {
    statement: 'More than coffee. A moment to yourself.',
    navTitle: 'Explore',
    socialTitle: 'Follow',
    rights: 'All rights reserved.',
    backToTop: 'Back to top',
    photoNote: 'Photography shown is illustrative.',
  },
}

type Widen<T> = T extends string
  ? string
  : T extends (...args: infer A) => infer R
    ? (...args: A) => R
    : T extends readonly (infer U)[]
      ? Widen<U>[]
      : { [K in keyof T]: Widen<T[K]> }

export type Dictionary = Widen<typeof en>

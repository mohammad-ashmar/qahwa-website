/** Site-wide constants. */
export const INSTAGRAM_URL = 'https://www.instagram.com/qahwa.nab/'

/** Section ids, in page order. Navigation and scroll tracking derive from this list. */
export const SECTIONS = ['home', 'about', 'menu', 'gallery', 'instagram'] as const
export type SectionId = (typeof SECTIONS)[number]

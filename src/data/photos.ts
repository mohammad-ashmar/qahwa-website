/**
 * Photo registry — the only place photography is wired into the site.
 *
 * HOW TO REPLACE A PHOTO
 * 1. Drop the new image into `src/assets/photos/` using the same file name
 *    (any reasonably large JPG/PNG — the build generates responsive WebP sizes).
 * 2. Update its `alt` text below (English and Arabic).
 * 3. When every photo is real QAHWA photography, set
 *    `PHOTOS_ARE_ILLUSTRATIVE = false` to remove the "illustrative" notes.
 *
 * The `?photo` / `?photo-sm` suffixes are handled by vite-imagetools
 * (see vite.config.ts).
 */
import type { Localized } from './menu'

import hero from '../assets/photos/hero.jpg?photo'
import heroDetail from '../assets/photos/hero-detail.jpg?photo-sm'
import aboutPour from '../assets/photos/about-pour.jpg?photo'
import aboutTools from '../assets/photos/about-tools.jpg?photo-sm'
import signature from '../assets/photos/signature.jpg?photo'
import galleryEspresso from '../assets/photos/gallery-espresso.jpg?photo'
import galleryMornings from '../assets/photos/gallery-mornings.jpg?photo'
import galleryIced from '../assets/photos/gallery-iced.jpg?photo'
import gallerySweet from '../assets/photos/gallery-sweet.jpg?photo'
import galleryCraft from '../assets/photos/gallery-craft.jpg?photo'
import galleryTogether from '../assets/photos/gallery-together.jpg?photo'
import menuCoffee from '../assets/photos/menu-coffee.jpg?photo-sm'
import menuLatte from '../assets/photos/menu-latte.jpg?photo-sm'
import menuSmoothie from '../assets/photos/menu-smoothie.jpg?photo-sm'
import menuMilkshake from '../assets/photos/menu-milkshake.jpg?photo-sm'
import menuMatcha from '../assets/photos/menu-matcha.jpg?photo-sm'
import menuDessert from '../assets/photos/menu-dessert.jpg?photo-sm'

export const PHOTOS_ARE_ILLUSTRATIVE = true

export type Photo = { src: ResponsiveImage; alt: Localized }

const p = (src: ResponsiveImage, en: string, ar: string): Photo => ({ src, alt: { en, ar } })

export const photos = {
  hero: p(hero, 'A cup of coffee with latte art on a saucer, seen from above', 'فنجان قهوة مع رسم على الحليب، من الأعلى'),
  heroDetail: p(heroDetail, 'Close-up of roasted coffee beans', 'صورة قريبة لحبوب قهوة محمّصة'),
  aboutPour: p(aboutPour, 'Steamed milk being poured into a cup of coffee', 'سكب الحليب المبخّر في فنجان قهوة'),
  aboutTools: p(aboutTools, 'Ground coffee, beans and a latte on a wooden board', 'بنّ مطحون وحبوب قهوة وفنجان لاتيه على لوح خشبي'),
  signature: p(signature, 'An iced coffee with milk swirling through it in a tall glass', 'قهوة مثلّجة يتمازج فيها الحليب في كوب طويل'),
  gallery: [
    p(galleryEspresso, 'A cup of black coffee on a wooden table', 'فنجان قهوة سوداء على طاولة خشبية'),
    p(galleryMornings, 'Cups of coffee with latte art among green plants', 'فناجين قهوة مع رسم على الحليب بين النباتات'),
    p(galleryIced, 'An iced coffee on a wooden counter', 'قهوة مثلّجة على طاولة خشبية'),
    p(gallerySweet, 'Small cream desserts topped with strawberries', 'حلويات كريمية صغيرة مزيّنة بالفراولة'),
    p(galleryCraft, 'Coffee being brewed by hand with a kettle', 'تحضير القهوة يدوياً بإبريق'),
    p(galleryTogether, 'Friends raising cups of coffee together', 'أصدقاء يرفعون فناجين القهوة معاً'),
  ],
  /** Optional per-category images for the digital menu. Categories without one get a typographic panel. */
  menu: {
    coffee: p(menuCoffee, 'Espresso portafilters with ground coffee and beans', 'أدوات إسبريسو مع بنّ مطحون وحبوب قهوة'),
    latte: p(menuLatte, 'A latte with latte art on a wooden table', 'لاتيه مع رسم على الحليب على طاولة خشبية'),
    'iced-coffee': p(galleryIced, 'An iced coffee on a wooden counter', 'قهوة مثلّجة على طاولة خشبية'),
    frappe: p(signature, 'An iced coffee drink in a tall glass', 'مشروب قهوة مثلّج في كوب طويل'),
    smoothie: p(menuSmoothie, 'Berry smoothies in glasses', 'سموذي التوت في أكواب'),
    milkshake: p(menuMilkshake, 'A milkshake topped with whipped cream', 'ميلك شيك مع كريمة مخفوقة'),
    matcha: p(menuMatcha, 'A matcha latte with latte art', 'ماتشا لاتيه مع رسم على الحليب'),
    dessert: p(menuDessert, 'A basket of chocolate chip cookies', 'سلّة من الكوكيز بالشوكولا'),
  } as Partial<Record<string, Photo>>,
}

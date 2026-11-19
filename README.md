# QAHWA — website

Single-page bilingual (English / Arabic) site for QAHWA, a coffee shop in Nabatieh, Lebanon.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS v4 · Motion (Framer Motion) · Lucide icons · vite-imagetools. No backend.

```bash
npm install
npm run dev            # local development
npm run build          # type check + production build → dist/
npm run preview        # serve the production build
npm run validate:menu  # check menu data against the printed menu (needs Node 22.18+)
```

## Project structure

```
src/
  data/menu.ts        ← all menu categories, products and LBP prices (single source of truth)
  data/photos.ts      ← photo registry: which image goes where + EN/AR alt text
  data/site.ts        ← Instagram URL, section ids
  i18n/en.ts, ar.ts   ← all interface copy (same shape, type-checked)
  i18n/LanguageProvider.tsx  ← language state, lang/dir, persistence, scroll preservation
  sections/           ← Hero, About, Featured, Menu, Gallery, Instagram, Footer
  components/         ← Navigation, LanguageSwitch, PriceTag, Picture, motion helpers, UI primitives
  assets/photos/      ← temporary photography (see CREDITS.md)
  assets/brand/       ← official logo (trimmed source; responsive WebP generated at build)
public/               ← favicons, Open Graph image, robots.txt
scripts/validate-menu.mjs
references/           ← supplied logo and the official menu (11.jpeg)
```

## Updating the menu

Edit `src/data/menu.ts` only — the UI reads everything from it.

- **Price:** change `price` (a plain LBP number, e.g. `350000`). Prices are shared by both languages.
- **No price:** `price: null` → shown as an em dash (“—”) with an accessible “Price unavailable” label.
- **Several prices:** an array, e.g. Cookies `[150000, 200000]` → `150,000 / 200,000 LBP`.
- **New product:** add `item('unique-id', 'English name', 'الاسم بالعربية', price)` to its category.
- **Signature:** `{ signature: true }` (currently Dulce Qahwa only).

Then update the transcription in `scripts/validate-menu.mjs` if the official menu changed, and run `npm run validate:menu`.

## Replacing photography

All current photos are temporary, illustrative Unsplash images (`src/assets/photos/CREDITS.md`).

1. Put the real photo in `src/assets/photos/` using the **same file name** (large JPG/PNG is fine — WebP sizes are generated at build).
2. Update its English and Arabic `alt` text in `src/data/photos.ts`.
3. When all photos are real QAHWA photography, set `PHOTOS_ARE_ILLUSTRATIVE = false` in `src/data/photos.ts` to remove the “illustrative” notes.

Salad and Iced Tea have no category photo; add one under `photos.menu` to show it.

## Bilingual system

- `LanguageProvider` holds the language, sets `<html lang/dir>`, title and meta description, and stores the choice in `localStorage` (`qahwa-lang`).
- An inline script in `index.html` applies the saved language (or an Arabic browser preference) before first paint, so there is no direction flash.
- Switching language keeps the reader in the same place within the current section.
- Layout uses logical properties (`ms-`, `ps-`, `start-`…), so RTL mirrors automatically.
- Fonts: Cormorant Garamond + Manrope for English, Amiri + Tajawal for Arabic. Self-hosted with unicode-range subsets, so each script’s files load only when needed.
- Prices use Western digits in both languages (as on the printed menu), isolated as LTR so `150,000 / 200,000` never reorders in Arabic; the currency reads `LBP` / `ل.ل.`.

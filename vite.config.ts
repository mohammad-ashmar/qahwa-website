import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'

/**
 * Image presets — import an image with one of these suffixes to get
 * responsive WebP sizes plus intrinsic dimensions:
 *   ?photo     large editorial photos   (480 → 1800px)
 *   ?photo-sm  supporting photos        (360 → 1100px)
 *   ?logo      the brand logo           (240 → 960px, alpha preserved)
 */
const presets: Record<string, Record<string, string>> = {
  photo: { w: '480;800;1200;1600;1800', format: 'webp', quality: '74', as: 'picture' },
  'photo-sm': { w: '360;640;900;1100', format: 'webp', quality: '74', as: 'picture' },
  logo: { w: '240;480;720;960', format: 'webp', quality: '90', as: 'picture' },
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imagetools({
      defaultDirectives: (url) => {
        for (const [name, directives] of Object.entries(presets)) {
          if (url.searchParams.has(name)) return new URLSearchParams(directives)
        }
        return new URLSearchParams()
      },
    }),
  ],
  build: {
    target: 'es2022',
    cssCodeSplit: false,
  },
})

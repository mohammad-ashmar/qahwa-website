import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Self-hosted fonts. Each package ships unicode-range subsets, so Arabic
// files only download when Arabic text is on screen (and vice versa).
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import '@fontsource-variable/manrope'
import '@fontsource/tajawal/400.css'
import '@fontsource/tajawal/500.css'
import '@fontsource/tajawal/700.css'
import '@fontsource/amiri/400.css'
import '@fontsource/amiri/700.css'
import './styles/index.css'

import { LanguageProvider } from './i18n/LanguageProvider'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)

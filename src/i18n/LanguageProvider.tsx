import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { en, type Dictionary } from './en'
import { ar } from './ar'

export type Lang = 'en' | 'ar'

const dictionaries: Record<Lang, Dictionary> = { en, ar }
export const STORAGE_KEY = 'qahwa-lang'

type LanguageContextValue = {
  lang: Lang
  dir: 'ltr' | 'rtl'
  t: Dictionary
  setLang: (lang: Lang) => void
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'ar') return stored
  } catch {
    /* storage unavailable */
  }
  // index.html sets <html lang> before first paint (from storage or browser language).
  return document.documentElement.lang === 'ar' ? 'ar' : 'en'
}

/** Find the section nearest the top of the viewport so we can keep the reader's place. */
function captureAnchor() {
  const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-anchor]'))
  let best: HTMLElement | null = null
  for (const el of sections) {
    if (el.getBoundingClientRect().top <= 1) best = el
  }
  if (!best) return null
  const rect = best.getBoundingClientRect()
  return { id: best.id, progress: -rect.top / Math.max(rect.height, 1) }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang)
  const anchor = useRef<ReturnType<typeof captureAnchor>>(null)

  const setLang = useCallback((next: Lang) => {
    anchor.current = captureAnchor()
    setLangState(next)
  }, [])

  const toggleLang = useCallback(() => setLang(lang === 'en' ? 'ar' : 'en'), [lang, setLang])

  useLayoutEffect(() => {
    const root = document.documentElement
    const t = dictionaries[lang]
    root.lang = lang
    root.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* storage unavailable */
    }

    // Restore the reader's position within the same section after the re-layout.
    const saved = anchor.current
    anchor.current = null
    if (saved) {
      const el = document.getElementById(saved.id)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY + saved.progress * el.offsetHeight
        window.scrollTo({ top, behavior: 'instant' as ScrollBehavior })
      }
    }
  }, [lang])

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, dir: lang === 'ar' ? 'rtl' : 'ltr', t: dictionaries[lang], setLang, toggleLang }),
    [lang, setLang, toggleLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}

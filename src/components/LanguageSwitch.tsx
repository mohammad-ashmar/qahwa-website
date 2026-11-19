import { useLanguage, type Lang } from '../i18n/LanguageProvider'

const OPTIONS: { lang: Lang; label: string; full: string }[] = [
  { lang: 'en', label: 'EN', full: 'English' },
  { lang: 'ar', label: 'عربي', full: 'العربية' },
]

/** Segmented EN / AR switch. Each option is labelled in its own language. */
export function LanguageSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLanguage()
  return (
    <div role="group" aria-label={t.a11y.langGroup} className={`inline-flex items-center rounded-full border border-espresso/20 p-1 ${className}`}>
      {OPTIONS.map((o) => {
        const active = o.lang === lang
        return (
          <button
            key={o.lang}
            type="button"
            lang={o.lang}
            aria-pressed={active}
            onClick={() => setLang(o.lang)}
            className={`relative min-h-9 min-w-11 rounded-full px-3 text-[0.8rem] font-semibold transition-colors duration-300 ${
              o.lang === 'ar' ? 'font-sans text-[0.9rem]' : 'tracking-[0.08em]'
            } ${active ? 'bg-espresso text-cream' : 'text-espresso/75 hover:text-espresso'}`}
          >
            <span>{o.label}</span>
            <span className="sr-only"> ({o.full})</span>
          </button>
        )
      })}
    </div>
  )
}

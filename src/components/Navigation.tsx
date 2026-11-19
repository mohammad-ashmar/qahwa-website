import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { Menu as MenuIcon, X } from 'lucide-react'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { useLanguage } from '../i18n/LanguageProvider'
import { useScrolled } from '../hooks/useScrolled'
import { useActiveSection } from '../hooks/useActiveSection'
import { SECTIONS, type SectionId } from '../data/site'
import { LanguageSwitch } from './LanguageSwitch'
import { InstagramIcon, InstagramLink, Logo } from './ui'
import { EASE } from './motion'

export function Navigation() {
  const { t } = useLanguage()
  const scrolled = useScrolled(24)
  const pastHero = useScrolled(220)
  const active = useActiveSection(SECTIONS)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const links: { id: SectionId; label: string }[] = SECTIONS.map((id) => ({ id, label: t.nav[id] }))
  const logoVisible = pastHero || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled && !open ? 'border-b border-espresso/10 bg-cream/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-espresso focus:px-4 focus:py-2 focus:text-cream"
      >
        {t.a11y.skip}
      </a>

      <nav aria-label={t.a11y.primaryNav} className="container-editorial flex h-16 items-center justify-between gap-6 lg:h-[4.75rem]">
        {/* The hero shows the full logo; the bar's logo appears once the hero logo scrolls away. */}
        <a
          href="#home"
          aria-label={t.a11y.logoHome}
          tabIndex={logoVisible ? 0 : -1}
          aria-hidden={!logoVisible}
          onClick={() => setOpen(false)}
          className={`relative z-[55] shrink-0 transition-[opacity,transform] duration-700 ease-(--ease-editorial) ${
            logoVisible ? 'opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
          }`}
        >
          <Logo sizes="128px" className="w-[6.75rem] lg:w-32" />
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className={`link-draw py-1 text-[0.92rem] font-medium transition-colors duration-300 ${
                  active === l.id ? 'text-espresso' : 'text-espresso/70 hover:text-espresso'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageSwitch className="hidden sm:inline-flex" />
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            className="relative z-[55] inline-flex size-11 items-center justify-center rounded-full border border-espresso/20 text-espresso transition-colors hover:border-espresso lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <MenuIcon className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <MobileMenu open={open} onClose={() => setOpen(false)} links={links} active={active} returnFocus={toggleRef} />
    </header>
  )
}

function MobileMenu({
  open,
  onClose,
  links,
  active,
  returnFocus,
}: {
  open: boolean
  onClose: () => void
  links: { id: SectionId; label: string }[]
  active: SectionId
  returnFocus: RefObject<HTMLButtonElement | null>
}) {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)

  // Close on resize to desktop, Escape, lock page scroll and keep focus inside while open.
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    root.style.overflow = 'hidden'
    const mq = window.matchMedia('(min-width: 1024px)')
    const onMq = () => mq.matches && onClose()
    mq.addEventListener('change', onMq)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        returnFocus.current?.focus()
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = [returnFocus.current, ...panelRef.current.querySelectorAll<HTMLElement>('a, button')].filter(Boolean) as HTMLElement[]
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()
    return () => {
      root.style.overflow = ''
      mq.removeEventListener('change', onMq)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, returnFocus])

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="mobile-menu"
          ref={panelRef}
          className="fixed inset-0 z-50 flex flex-col bg-cream lg:hidden"
          initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="container-editorial flex flex-1 flex-col justify-between pb-[max(2rem,env(safe-area-inset-bottom))] pt-28">
            <nav aria-label={t.a11y.primaryNav}>
            <ul className="flex flex-col">
              {links.map((l, i) => (
                <m.li
                  key={l.id}
                  className="border-b border-espresso/12"
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.06 }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={onClose}
                    aria-current={active === l.id ? 'true' : undefined}
                    className="group flex items-baseline gap-5 py-4"
                  >
                    <span className="label w-6 text-coffee tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <span
                      className={`font-display text-[2.6rem] leading-none transition-colors ${
                        active === l.id ? 'text-espresso italic' : 'text-espresso/80 group-hover:text-espresso'
                      }`}
                    >
                      {l.label}
                    </span>
                  </a>
                </m.li>
              ))}
            </ul>
            </nav>

            <m.div
              className="flex flex-wrap items-center justify-between gap-4 pt-10"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <LanguageSwitch />
              <InstagramLink className="inline-flex min-h-11 items-center gap-2 text-[0.95rem] font-semibold text-espresso">
                <InstagramIcon className="size-5" />
                <span dir="ltr">@qahwa.nab</span>
              </InstagramLink>
            </m.div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}

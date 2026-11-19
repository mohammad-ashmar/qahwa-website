import { ArrowUpRight, ArrowDown } from 'lucide-react'
import type { MouseEvent, ReactNode } from 'react'
import logo from '../assets/brand/qahwa-logo.png?logo'
import { useLanguage } from '../i18n/LanguageProvider'
import { INSTAGRAM_URL } from '../data/site'

/** The official QAHWA logo (supplied artwork, proportions preserved). */
export function Logo({ className = '', sizes, priority = false }: { className?: string; sizes: string; priority?: boolean }) {
  return (
    <img
      src={logo.img.src}
      srcSet={logo.sources.webp}
      sizes={sizes}
      width={logo.img.w}
      height={logo.img.h}
      alt="QAHWA"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={`block h-auto ${className}`}
      draggable={false}
    />
  )
}

/** Instagram glyph (brand icons are not part of Lucide). */
export function InstagramIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

/** "01 — About QAHWA" style section label. */
export function SectionLabel({ index, children, tone = 'dark' }: { index: string; children: ReactNode; tone?: 'dark' | 'light' }) {
  const muted = tone === 'dark' ? 'text-coffee' : 'text-caramel'
  return (
    <p className={`label flex items-center gap-3 ${muted}`}>
      <span className="tabular-nums">{index}</span>
      <span aria-hidden="true" className="h-px w-10 bg-current opacity-60" />
      <span>{children}</span>
    </p>
  )
}

type ButtonProps = {
  href: string
  children: ReactNode
  variant?: 'solid' | 'outline' | 'light'
  icon?: 'arrow' | 'down' | 'instagram'
  external?: boolean
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
  className?: string
}

/** Link styled as a button. A fill sweeps in from the reading-start edge on hover. */
export function ButtonLink({ href, children, variant = 'solid', icon = 'arrow', external, onClick, className = '' }: ButtonProps) {
  const { t } = useLanguage()
  const styles = {
    solid: 'bg-espresso text-cream border-espresso before:bg-coffee',
    outline: 'bg-transparent text-espresso border-espresso/40 hover:border-espresso before:bg-espresso hover:text-cream',
    light: 'bg-cream text-espresso border-cream before:bg-caramel',
  }[variant]
  const Icon =
    icon === 'instagram' ? (
      <InstagramIcon className="size-[1.05rem]" />
    ) : icon === 'down' ? (
      <ArrowDown aria-hidden="true" className="size-4 transition-transform duration-500 ease-(--ease-editorial) group-hover:translate-y-0.5" />
    ) : (
      <ArrowUpRight
        aria-hidden="true"
        className="size-4 transition-transform duration-500 ease-(--ease-editorial) group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
      />
    )

  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group relative isolate inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full border px-7 text-[0.95rem] font-semibold transition-[color,border-color,transform] duration-500 ease-(--ease-editorial) before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:transition-transform before:duration-500 before:ease-(--ease-editorial) hover:before:scale-x-100 active:scale-[0.98] rtl:before:origin-right ${styles} ${className}`}
    >
      <span>{children}</span>
      {Icon}
      {external && <span className="sr-only"> {t.a11y.newTab}</span>}
    </a>
  )
}

export function InstagramLink({ className = '', children }: { className?: string; children: ReactNode }) {
  const { t } = useLanguage()
  return (
    <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> {t.a11y.newTab}</span>
    </a>
  )
}

import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { useEffect, useRef, type KeyboardEvent } from 'react'
import { useLanguage } from '../i18n/LanguageProvider'
import { menu, type MenuCategory } from '../data/menu'
import { photos } from '../data/photos'
import { Picture } from '../components/Picture'
import { PriceTag } from '../components/PriceTag'
import { SectionLabel } from '../components/ui'
import { EASE, FadeIn, RiseLine } from '../components/motion'

type Props = { activeId: string; onSelect: (id: string) => void }

export const tabId = (id: string) => `menu-tab-${id}`
const PANEL_ID = 'menu-panel'

export function Menu({ activeId, onSelect }: Props) {
  const { t, lang, dir } = useLanguage()
  const reduce = useReducedMotion()
  const tablistRef = useRef<HTMLDivElement>(null)
  const panelWrapRef = useRef<HTMLDivElement>(null)
  const active = menu.find((c) => c.id === activeId) ?? menu[0]

  // Keep the active tab visible in the horizontally scrolling mobile tab bar.
  useEffect(() => {
    const list = tablistRef.current
    const tab = document.getElementById(tabId(active.id))
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return
    const listRect = list.getBoundingClientRect()
    const tabRect = tab.getBoundingClientRect()
    const offset = tabRect.left - listRect.left - (listRect.width - tabRect.width) / 2
    list.scrollBy({ left: offset, behavior: reduce ? 'auto' : 'smooth' })
  }, [active.id, reduce, lang])

  const select = (id: string) => {
    onSelect(id)
    // If the reader is below the top of the panel (mobile), bring the new list into view.
    const wrap = panelWrapRef.current
    if (wrap && wrap.getBoundingClientRect().top < 0) {
      const stickyOffset = window.matchMedia('(min-width: 1024px)').matches ? 96 : 136
      window.scrollTo({ top: wrap.getBoundingClientRect().top + window.scrollY - stickyOffset, behavior: reduce ? 'auto' : 'smooth' })
    }
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const index = menu.findIndex((c) => c.id === active.id)
    const forward = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight'
    const back = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft'
    let next: number | null = null
    if (e.key === forward || e.key === 'ArrowDown') next = (index + 1) % menu.length
    else if (e.key === back || e.key === 'ArrowUp') next = (index - 1 + menu.length) % menu.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = menu.length - 1
    if (next === null) return
    e.preventDefault()
    select(menu[next].id)
    document.getElementById(tabId(menu[next].id))?.focus()
  }

  return (
    <section id="menu" data-anchor aria-labelledby="menu-title" className="relative bg-paper py-24 sm:py-32 lg:py-40">
      <div className="container-editorial">
        {/* Header */}
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-7">
            <SectionLabel index={t.menu.index}>{t.menu.label}</SectionLabel>
            <h2 id="menu-title" className="type-section mt-6 text-espresso">
              <RiseLine>{t.menu.title}</RiseLine>
            </h2>
          </div>
          <FadeIn className="max-w-sm self-end lg:col-span-4 lg:col-start-9">
            <p className="type-lede text-espresso/80">{t.menu.intro}</p>
          </FadeIn>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:mt-20 lg:grid-cols-12 lg:gap-x-8">
          {/* Category tabs: sticky horizontal bar on mobile, sticky vertical index on desktop */}
          <div className="sticky top-16 z-20 -mx-[clamp(1.25rem,0.6rem+3vw,4rem)] border-b border-espresso/10 bg-paper/95 backdrop-blur-md lg:top-28 lg:col-span-4 lg:mx-0 lg:self-start lg:border-0 lg:bg-transparent lg:backdrop-blur-none">
            <div
              ref={tablistRef}
              role="tablist"
              aria-label={t.a11y.categories}
              onKeyDown={onKeyDown}
              className="no-scrollbar flex gap-1 overflow-x-auto scroll-px-5 px-[clamp(1.25rem,0.6rem+3vw,4rem)] py-3 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:py-0"
            >
              {menu.map((c, i) => {
                const selected = c.id === active.id
                return (
                  <button
                    key={c.id}
                    id={tabId(c.id)}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={PANEL_ID}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(c.id)}
                    className={`group relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[0.95rem] font-medium whitespace-nowrap transition-colors duration-300 lg:grid lg:grid-cols-[2.25rem_1fr_auto] lg:items-baseline lg:gap-3 lg:rounded-none lg:border-b lg:border-espresso/10 lg:px-0 lg:py-4 lg:text-start ${
                      selected ? 'bg-espresso text-cream lg:bg-transparent lg:text-espresso' : 'text-espresso/70 hover:text-espresso'
                    }`}
                  >
                    <span className="label hidden text-coffee tabular-nums lg:inline">{String(i + 1).padStart(2, '0')}</span>
                    <span className="lg:font-display lg:text-[1.85rem] lg:leading-tight lg:transition-transform lg:duration-500 lg:ease-(--ease-editorial) lg:group-hover:translate-x-1 rtl:lg:group-hover:-translate-x-1">
                      {c.name[lang]}
                    </span>
                    <span className={`hidden text-sm tabular-nums lg:inline ${selected ? 'text-coffee' : 'text-espresso/50'}`}>{c.items.length}</span>
                    {selected && (
                      <m.span
                        initial={reduce ? false : { scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        aria-hidden="true"
                        className="absolute inset-y-3 -start-5 hidden w-[3px] rounded-full bg-caramel lg:block"
                        transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active category */}
          <div ref={panelWrapRef} className="mt-10 lg:col-span-8 lg:mt-0">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={active.id}
                id={PANEL_ID}
                role="tabpanel"
                aria-labelledby={tabId(active.id)}
                tabIndex={0}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: reduce ? 0.15 : 0.45, ease: EASE }}
                className="focus-visible:outline-offset-8"
              >
                <CategoryPanel category={active} index={menu.indexOf(active)} />
              </m.div>
            </AnimatePresence>
            <p className="mt-10 text-sm text-espresso/70">{t.menu.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function CategoryPanel({ category, index }: { category: MenuCategory; index: number }) {
  const { t, lang } = useLanguage()
  const reduce = useReducedMotion()
  const other = lang === 'en' ? 'ar' : 'en'
  const photo = photos.menu[category.id]

  return (
    <>
      <div className="grid grid-cols-[1fr_auto] items-end gap-6 sm:gap-10">
        <div className="min-w-0">
          <p className="label text-coffee">
            <span className="tabular-nums">{String(index + 1).padStart(2, '0')}</span>
            <span aria-hidden="true"> / </span>
            <span className="tabular-nums">{String(menu.length).padStart(2, '0')}</span>
            <span className="mx-3" aria-hidden="true">·</span>
            {t.menu.items(category.items.length)}
          </p>
          <h3 className="mt-4 font-display text-[clamp(2.8rem,1.8rem+4vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.02em] text-espresso [:lang(ar)_&]:font-bold [:lang(ar)_&]:leading-[1.25]">
            {category.name[lang]}
          </h3>
          <p lang={other} className="mt-3 font-display text-2xl italic text-coffee">
            {category.name[other]}
          </p>
        </div>

        {photo ? (
          <m.div
            className="w-28 overflow-hidden bg-sand sm:w-44 lg:w-52"
            initial={reduce ? false : { clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
          >
            <div className="aspect-[4/5] overflow-hidden">
              <Picture photo={photo} sizes="(min-width: 1024px) 208px, (min-width: 640px) 176px, 112px" />
            </div>
          </m.div>
        ) : (
          // Typographic panel where no photograph is available.
          <div aria-hidden="true" className="flex aspect-[4/5] w-28 items-center justify-center bg-cream sm:w-44 lg:w-52">
            <span className="font-display text-[clamp(3.5rem,2.5rem+4vw,6.5rem)] italic leading-none text-caramel">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        )}
      </div>

      <ul className="mt-10 border-t border-espresso/15 sm:mt-14">
        {category.items.map((item, i) => (
          <m.li
            key={item.id}
            className="group border-b border-espresso/10 py-5"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.08 + i * 0.035 }}
          >
            <div className="flex items-baseline gap-3 sm:gap-4">
              <p className="min-w-0 text-[1.08rem] font-semibold text-espresso transition-transform duration-500 ease-(--ease-editorial) group-hover:translate-x-1 rtl:group-hover:-translate-x-1 sm:text-[1.15rem]">
                {item.name[lang]}
                {item.signature && (
                  <span className="ms-3 inline-flex translate-y-[-0.1em] items-center gap-1.5 rounded-full bg-espresso px-2.5 py-0.5 align-middle text-[0.68rem] font-semibold tracking-[0.12em] text-cream uppercase [:lang(ar)_&]:text-[0.8rem] [:lang(ar)_&]:normal-case">
                    <span aria-hidden="true" className="size-1 rounded-full bg-caramel" />
                    {t.menu.signature}
                  </span>
                )}
              </p>
              <span
                aria-hidden="true"
                className="min-w-4 flex-1 translate-y-[-0.3em] border-b border-dotted border-espresso/25 transition-colors duration-300 group-hover:border-espresso/50"
              />
              <PriceTag price={item.price} className="shrink-0 text-[0.98rem] font-medium text-espresso" currencyClassName="text-[0.78rem] font-semibold text-coffee" />
            </div>
            <p lang={other} className="mt-1 text-[0.92rem] text-coffee/90">
              {item.name[other]}
            </p>
          </m.li>
        ))}
      </ul>
    </>
  )
}

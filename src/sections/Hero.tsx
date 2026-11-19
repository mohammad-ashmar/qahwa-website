import { m, useReducedMotion } from 'motion/react'
import { useLanguage } from '../i18n/LanguageProvider'
import { photos } from '../data/photos'
import { menu } from '../data/menu'
import { INSTAGRAM_URL } from '../data/site'
import { Picture } from '../components/Picture'
import { ButtonLink, Logo } from '../components/ui'
import { EASE, FadeIn, MaskReveal, RiseLine, useParallax } from '../components/motion'

export function Hero() {
  const { t, lang } = useLanguage()
  const reduce = useReducedMotion()
  const [detailRef, detailY] = useParallax(40)

  return (
    <section id="home" data-anchor aria-labelledby="hero-title" className="relative overflow-hidden pt-20 lg:pt-24">
      <div className="container-editorial relative grid grid-cols-1 gap-y-14 pb-14 pt-6 lg:min-h-[calc(100svh-6rem)] lg:grid-cols-12 lg:gap-x-8 lg:pb-16 lg:pt-10">
        {/* Copy */}
        <div className="relative z-10 flex flex-col lg:col-span-7 lg:justify-between lg:pe-6">
          <div>
            <FadeIn immediate delay={0.05}>
              <Logo priority sizes="(min-width: 1024px) 336px, 240px" className="w-60 sm:w-72 lg:w-[21rem]" />
            </FadeIn>

            <FadeIn immediate delay={0.2} className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 lg:mt-14">
              <p className="label text-coffee">{t.hero.eyebrow}</p>
              <span aria-hidden="true" className="hidden h-px w-8 bg-coffee/50 sm:block" />
              <p className="label text-coffee/90">{t.hero.place}</p>
            </FadeIn>

            <h1 id="hero-title" className="mt-6 text-espresso">
              <RiseLine immediate delay={0.3} className="type-hero">
                {t.hero.titleA}
              </RiseLine>
              <RiseLine
                immediate
                delay={0.45}
                className="mt-3 font-display text-[clamp(1.9rem,1.1rem+3vw,4.4rem)] font-medium italic leading-[1.05] text-coffee lg:mt-4"
              >
                {t.hero.titleB}
              </RiseLine>
            </h1>
          </div>

          <div className="mt-10 lg:mt-12">
            {/* Not animated: this paragraph is the LCP element on mobile. */}
            <p className="type-lede max-w-[34rem] text-espresso/85">{t.hero.lede}</p>
            <FadeIn immediate delay={0.6} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="#menu" icon="down">
                {t.hero.ctaMenu}
              </ButtonLink>
              <ButtonLink href={INSTAGRAM_URL} external variant="outline" icon="instagram">
                {t.hero.ctaInstagram}
              </ButtonLink>
            </FadeIn>
          </div>
        </div>

        {/* Imagery */}
        <div className="relative lg:col-span-5">

          <MaskReveal immediate delay={0.15} className="relative z-[1] ms-[12%] aspect-[4/5] bg-sand lg:ms-0 lg:h-full lg:max-h-[46rem] lg:min-h-[34rem] lg:aspect-auto">
            <Picture photo={photos.hero} priority sizes="(min-width: 1024px) 38vw, 88vw" />
          </MaskReveal>

          <div ref={detailRef} className="absolute -bottom-8 start-0 z-[2] w-[44%] lg:-start-[22%] lg:bottom-12 lg:w-[46%]">
            <m.div style={{ y: detailY }}>
              <MaskReveal immediate delay={0.6} className="aspect-[4/5] bg-sand ring-[10px] ring-cream">
                <Picture photo={photos.heroDetail} sizes="(min-width: 1024px) 18vw, 40vw" />
              </MaskReveal>
            </m.div>
          </div>
        </div>
      </div>

      {/* Category ticker — decorative; the real menu navigation lives in the Menu section. */}
      <m.div
        aria-hidden="true"
        className="relative mt-10 overflow-hidden border-y border-espresso/12 py-4 lg:mt-0"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1, ease: EASE }}
      >
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {menu.map((c) => (
                <li key={c.id} className="flex items-center">
                  <span className="px-6 font-display text-2xl italic text-espresso/80 lg:text-3xl">{c.name[lang]}</span>
                  <span className="size-1.5 rounded-full bg-caramel" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </m.div>
    </section>
  )
}

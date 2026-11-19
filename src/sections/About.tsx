import { m } from 'motion/react'
import { useLanguage } from '../i18n/LanguageProvider'
import { photos } from '../data/photos'
import { Picture } from '../components/Picture'
import { SectionLabel } from '../components/ui'
import { FadeIn, MaskReveal, RiseLine, useParallax } from '../components/motion'

export function About() {
  const { t } = useLanguage()
  const [smallRef, smallY] = useParallax(70)

  return (
    <section id="about" data-anchor aria-labelledby="about-title" className="relative py-24 sm:py-32 lg:py-44">
      <div className="container-editorial">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-3">
            <SectionLabel index={t.about.index}>{t.about.label}</SectionLabel>
          </div>
          <h2 id="about-title" className="type-statement text-espresso lg:col-span-9">
            <RiseLine>{t.about.statementA}</RiseLine>
            <RiseLine delay={0.12} className="italic text-coffee">
              {t.about.statementB}
            </RiseLine>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-x-4 gap-y-12 sm:gap-x-8 lg:mt-24">
          {/* Large landscape image, offset from the grid edge */}
          <MaskReveal className="col-span-12 aspect-[4/3] bg-sand sm:col-span-10 lg:col-span-7 lg:aspect-[5/4]">
            <Picture photo={photos.aboutPour} sizes="(min-width: 1024px) 55vw, (min-width: 640px) 80vw, 100vw" />
          </MaskReveal>

          <div className="col-span-12 flex flex-col justify-between gap-12 lg:col-span-4 lg:col-start-9">
            <div className="max-w-md space-y-5 text-[1.05rem] leading-relaxed text-espresso/85">
              {t.about.body.map((para, i) => (
                <FadeIn key={i} as="p" delay={i * 0.1} className={i === 0 ? 'text-lg text-espresso' : ''}>
                  {para}
                </FadeIn>
              ))}
            </div>

            <div ref={smallRef} className="ms-auto w-[62%] sm:w-1/2 lg:ms-0 lg:w-[78%]">
              <m.div style={{ y: smallY }}>
                <MaskReveal delay={0.1} className="aspect-[3/4] bg-sand">
                  <Picture photo={photos.aboutTools} sizes="(min-width: 1024px) 26vw, 55vw" className="object-[30%_50%]" />
                </MaskReveal>
              </m.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

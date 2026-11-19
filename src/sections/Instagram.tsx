import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageProvider'
import { INSTAGRAM_URL } from '../data/site'
import { ButtonLink, InstagramIcon, InstagramLink, SectionLabel } from '../components/ui'
import { FadeIn, RiseLine } from '../components/motion'

export function Instagram() {
  const { t } = useLanguage()

  return (
    <section id="instagram" data-anchor aria-labelledby="instagram-title" className="relative overflow-hidden border-t border-espresso/10 bg-paper py-24 sm:py-32 lg:py-40">
      <div className="container-editorial">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-6">
            <SectionLabel index={t.instagram.index}>{t.instagram.label}</SectionLabel>
            <h2 id="instagram-title" className="type-statement mt-6 text-espresso">
              <RiseLine>{t.instagram.title}</RiseLine>
            </h2>
          </div>
          <FadeIn className="self-end lg:col-span-4 lg:col-start-9">
            <p className="type-lede max-w-sm text-espresso/80">{t.instagram.body}</p>
          </FadeIn>
        </div>

        {/* The handle is the hero of this section — one large, unmistakable link. */}
        <FadeIn className="mt-16 lg:mt-24">
          <InstagramLink className="group relative block border-y border-espresso/15 py-8 sm:py-12">
            <span className="flex items-center justify-between gap-6">
              <span
                dir="ltr"
                className="min-w-0 font-display text-[clamp(2.9rem,1rem+9.5vw,11rem)] font-medium leading-[0.9] tracking-[-0.03em] text-espresso transition-colors duration-500 group-hover:text-coffee"
              >
                @qahwa<span className="italic text-caramel">.</span>nab
              </span>
              <span className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-espresso/25 transition-colors duration-500 group-hover:border-espresso group-hover:bg-espresso sm:size-24 lg:size-32">
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-6 text-espresso transition-[transform,color] duration-500 ease-(--ease-editorial) group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-0 group-hover:text-cream sm:size-9 lg:size-11 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                />
              </span>
            </span>
            <span className="sr-only">{t.instagram.cta}</span>
            {/* Underline that sweeps across on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-espresso transition-transform duration-700 ease-(--ease-editorial) group-hover:scale-x-100 rtl:origin-right"
            />
          </InstagramLink>
        </FadeIn>

        <FadeIn className="mt-10 flex flex-wrap items-center gap-6">
          <ButtonLink href={INSTAGRAM_URL} external icon="instagram">
            {t.instagram.cta}
          </ButtonLink>
          <span className="inline-flex items-center gap-2 text-sm text-espresso/70">
            <InstagramIcon className="size-4" />
            <span dir="ltr">instagram.com/qahwa.nab</span>
          </span>
        </FadeIn>
      </div>
    </section>
  )
}

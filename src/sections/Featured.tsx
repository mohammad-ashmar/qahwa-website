import { ArrowUpRight } from 'lucide-react'
import { useMemo } from 'react'
import { useLanguage } from '../i18n/LanguageProvider'
import { featuredIds, menu, signatureItem } from '../data/menu'
import { photos } from '../data/photos'
import { Picture } from '../components/Picture'
import { PriceTag } from '../components/PriceTag'
import { SectionLabel } from '../components/ui'
import { FadeIn, MaskReveal, RiseLine } from '../components/motion'

type Props = { onOpenCategory: (categoryId: string) => void }

export function Featured({ onOpenCategory }: Props) {
  const { t, lang } = useLanguage()
  const other = lang === 'en' ? 'ar' : 'en'

  const featured = useMemo(
    () =>
      featuredIds.map((id) => {
        const category = menu.find((c) => c.items.some((i) => i.id === id))!
        return { item: category.items.find((i) => i.id === id)!, category }
      }),
    [],
  )

  return (
    <section aria-labelledby="featured-title" className="on-dark relative bg-espresso py-24 text-cream sm:py-32 lg:py-40">
      <div className="container-editorial">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel index={t.featured.index} tone="light">
              {t.featured.label}
            </SectionLabel>
            <h2 id="featured-title" className="type-section mt-6">
              <RiseLine>{t.featured.title}</RiseLine>
            </h2>
          </div>
        </div>

        {/* Signature — Dulce Qahwa */}
        <article aria-labelledby="signature-name" className="mt-16 grid grid-cols-1 items-center gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <div className="relative lg:col-span-6">
            <MaskReveal className="aspect-[4/5] bg-coffee sm:aspect-[5/4] lg:aspect-[4/5]">
              <Picture photo={photos.signature} sizes="(min-width: 1024px) 46vw, 100vw" />
            </MaskReveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <FadeIn>
              <p className="inline-flex items-center gap-3 rounded-full border border-caramel/60 px-4 py-1.5">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-caramel" />
                <span className="label text-caramel">{t.featured.signatureLabel}</span>
              </p>
            </FadeIn>
            <h3 id="signature-name" className="mt-8 font-display text-[clamp(3.4rem,2rem+6vw,8rem)] font-medium leading-[0.9] tracking-[-0.02em] [:lang(ar)_&]:leading-[1.2]">
              <RiseLine>{signatureItem.name[lang]}</RiseLine>
            </h3>
            <FadeIn delay={0.1}>
              <p lang={other} className="mt-4 font-display text-2xl italic text-cream/70">
                {signatureItem.name[other]}
              </p>
            </FadeIn>

            <FadeIn delay={0.2} className="mt-10 border-t border-cream/15 pt-8">
              <dl className="grid grid-cols-2 gap-6">
                <div>
                  <dt className="label text-cream/60">{t.featured.categoryLabel}</dt>
                  <dd className="mt-2 text-lg">{signatureItem.category.name[lang]}</dd>
                </div>
                <div>
                  <dt className="label text-cream/60">{t.featured.priceLabel}</dt>
                  <dd className="mt-2 text-lg">
                    <PriceTag price={signatureItem.price} currencyClassName="text-caramel" />
                  </dd>
                </div>
              </dl>
              <p className="mt-8 max-w-sm text-cream/75">{t.featured.signatureNote}</p>
              <button
                type="button"
                onClick={() => onOpenCategory(signatureItem.category.id)}
                className="group mt-8 inline-flex min-h-11 items-center gap-3 text-[0.95rem] font-semibold text-cream"
              >
                <span className="link-draw pb-0.5">{t.featured.signatureCta}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 text-caramel transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                />
              </button>
            </FadeIn>
          </div>
        </article>

        {/* Worth trying — editorial index of selected menu items */}
        <div className="mt-24 lg:mt-36">
          <p className="label text-caramel">{t.featured.alsoLabel}</p>
          <ul className="mt-8 border-t border-cream/15">
            {featured.map(({ item, category }, i) => (
              <FadeIn as="li" key={item.id} delay={i * 0.06} className="border-b border-cream/15">
                <button
                  type="button"
                  onClick={() => onOpenCategory(category.id)}
                  className="group grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-x-5 py-6 text-start sm:gap-x-8 sm:py-8"
                >
                  <span className="label w-8 text-cream/50 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <span className="min-w-0">
                    <span className="block font-display text-[clamp(1.9rem,1.3rem+2.2vw,3.5rem)] leading-[1.05] transition-[color,transform] duration-500 ease-(--ease-editorial) group-hover:translate-x-2 group-hover:text-caramel rtl:group-hover:-translate-x-2">
                      {item.name[lang]}
                    </span>
                    <span className="mt-2 block text-sm text-cream/60">{category.name[lang]}</span>
                  </span>
                  <span className="flex items-center gap-4">
                    <PriceTag price={item.price} className="text-sm sm:text-base" currencyClassName="text-cream/60" />
                    <ArrowUpRight
                      aria-hidden="true"
                      className="hidden size-5 text-caramel opacity-0 transition-[opacity,transform] duration-500 group-hover:opacity-100 sm:block rtl:-scale-x-100"
                    />
                  </span>
                </button>
              </FadeIn>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

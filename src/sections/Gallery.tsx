import { useLanguage } from '../i18n/LanguageProvider'
import { photos, PHOTOS_ARE_ILLUSTRATIVE } from '../data/photos'
import { Picture } from '../components/Picture'
import { SectionLabel } from '../components/ui'
import { FadeIn, MaskReveal, RiseLine } from '../components/motion'

/**
 * Asymmetric editorial layout. Each entry sets its grid placement and crop;
 * order matches `photos.gallery`.
 */
const LAYOUT = [
  { figure: 'col-span-2 lg:col-span-5', frame: 'aspect-[4/5]', sizes: '(min-width: 1024px) 40vw, 100vw' },
  { figure: 'col-span-1 lg:col-span-3 lg:col-start-7 lg:mt-44', frame: 'aspect-[3/4]', sizes: '(min-width: 1024px) 24vw, 50vw' },
  { figure: 'col-span-1 mt-20 lg:col-span-3 lg:col-start-10 lg:mt-10', frame: 'aspect-[3/4]', sizes: '(min-width: 1024px) 24vw, 50vw' },
  { figure: 'col-span-2 lg:col-span-6 lg:col-start-2 lg:mt-20', frame: 'aspect-[3/2]', sizes: '(min-width: 1024px) 48vw, 100vw' },
  { figure: 'col-span-1 col-start-2 lg:col-span-3 lg:col-start-9 lg:mt-40', frame: 'aspect-[4/5]', sizes: '(min-width: 1024px) 24vw, 50vw' },
  { figure: 'col-span-2 lg:col-span-7 lg:col-start-5 lg:mt-12', frame: 'aspect-[16/10]', sizes: '(min-width: 1024px) 56vw, 100vw' },
]

export function Gallery() {
  const { t } = useLanguage()

  return (
    <section id="gallery" data-anchor aria-labelledby="gallery-title" className="relative overflow-hidden py-24 sm:py-32 lg:py-44">
      <div className="container-editorial">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-8">
            <SectionLabel index={t.gallery.index}>{t.gallery.label}</SectionLabel>
            <h2 id="gallery-title" className="type-section mt-6 text-espresso">
              <RiseLine>{t.gallery.title}</RiseLine>
            </h2>
          </div>
          <FadeIn className="self-end lg:col-span-4">
            <p className="type-lede max-w-sm text-espresso/80">{t.gallery.intro}</p>
            {PHOTOS_ARE_ILLUSTRATIVE && <p className="mt-4 text-sm text-coffee">{t.gallery.illustrative}</p>}
          </FadeIn>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:mt-24 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
          {photos.gallery.map((photo, i) => {
            const l = LAYOUT[i % LAYOUT.length]
            return (
              <figure key={i} className={`group ${l.figure}`}>
                <MaskReveal delay={(i % 3) * 0.08} className={`${l.frame} bg-sand`}>
                  <div className="h-full w-full transition-transform duration-[1.4s] ease-(--ease-editorial) group-hover:scale-[1.04]">
                    <Picture photo={photo} sizes={l.sizes} />
                  </div>
                </MaskReveal>
                <figcaption className="mt-3 flex items-baseline gap-3 text-sm text-espresso/80">
                  <span className="label text-coffee tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-lg italic">{t.gallery.captions[i]}</span>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}

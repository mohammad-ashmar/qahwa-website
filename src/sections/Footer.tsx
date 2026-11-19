import { ArrowUp } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageProvider'
import { SECTIONS } from '../data/site'
import { PHOTOS_ARE_ILLUSTRATIVE } from '../data/photos'
import { InstagramIcon, InstagramLink, Logo } from '../components/ui'

export function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-cream pt-20 pb-[max(2rem,env(safe-area-inset-bottom))] lg:pt-28">
      <div className="container-editorial">
        <div className="grid grid-cols-1 gap-14 border-b border-espresso/12 pb-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <Logo sizes="288px" className="w-56 lg:w-72" />
            <p className="mt-8 max-w-xs font-display text-2xl italic leading-snug text-coffee">{t.footer.statement}</p>
          </div>

          <nav aria-label={t.a11y.footerNav} className="md:col-span-3">
            <p className="label text-coffee">{t.footer.navTitle}</p>
            <ul className="mt-5 space-y-1">
              {SECTIONS.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="link-draw inline-flex min-h-10 items-center text-espresso/85 hover:text-espresso">
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="label text-coffee">{t.footer.socialTitle}</p>
            <InstagramLink className="mt-5 inline-flex min-h-10 items-center gap-2 text-espresso/85 hover:text-espresso">
              <InstagramIcon className="size-[1.1rem]" />
              <span dir="ltr" className="link-draw">
                @qahwa.nab
              </span>
            </InstagramLink>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-6 pt-8 text-sm text-espresso/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <span className="tabular-nums">{year}</span> QAHWA. {t.footer.rights}
            {PHOTOS_ARE_ILLUSTRATIVE && <span className="block sm:inline sm:ms-2">{t.footer.photoNote}</span>}
          </p>
          <a href="#home" className="group inline-flex min-h-10 items-center gap-2 font-medium text-espresso">
            <span className="link-draw">{t.footer.backToTop}</span>
            <ArrowUp aria-hidden="true" className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}

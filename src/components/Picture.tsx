import type { Photo } from '../data/photos'
import { useLanguage } from '../i18n/LanguageProvider'

type Props = {
  photo: Photo
  /** Real rendered width hint, e.g. "(min-width: 1024px) 40vw, 90vw". */
  sizes: string
  className?: string
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean
}

/** Responsive WebP image with intrinsic dimensions (no layout shift) and localized alt text. */
export function Picture({ photo, sizes, className = '', priority = false }: Props) {
  const { lang } = useLanguage()
  const { src } = photo
  const srcSet = src.sources.webp ?? Object.values(src.sources)[0]
  return (
    <img
      src={src.img.src}
      srcSet={srcSet}
      sizes={sizes}
      width={src.img.w}
      height={src.img.h}
      alt={photo.alt[lang]}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={`block h-full w-full object-cover ${className}`}
    />
  )
}

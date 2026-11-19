import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef, type ReactNode, type RefObject } from 'react'

export const EASE = [0.22, 1, 0.36, 1] as const
export const EASE_SOFT = [0.65, 0, 0.35, 1] as const

const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' } as const

/** Trigger props: play on mount, or when the (always-measurable) outer element enters the viewport. */
const trigger = (immediate: boolean) =>
  immediate ? { initial: 'hidden', animate: 'shown' } : { initial: 'hidden', whileInView: 'shown', viewport: VIEWPORT }

/**
 * Image reveal: a clip-path wipe from the bottom while the image settles from a
 * slight zoom. Used for key editorial images only — not every element.
 */
export function MaskReveal({
  children,
  className = '',
  delay = 0,
  immediate = false,
}: {
  children: ReactNode
  className?: string
  delay?: number
  /** Animate on mount (hero) instead of on entering the viewport. */
  immediate?: boolean
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={`overflow-hidden ${className}`}>{children}</div>

  return (
    <m.div
      className={`overflow-hidden ${className}`}
      variants={{ hidden: { clipPath: 'inset(100% 0% 0% 0%)' }, shown: { clipPath: 'inset(0% 0% 0% 0%)' } }}
      transition={{ duration: 1.25, ease: EASE_SOFT, delay }}
      {...trigger(immediate)}
    >
      <m.div
        className="h-full w-full"
        variants={{ hidden: { scale: 1.14 }, shown: { scale: 1 } }}
        transition={{ duration: 1.8, ease: EASE, delay }}
      >
        {children}
      </m.div>
    </m.div>
  )
}

/** A line of display type that rises out of its own baseline mask. */
export function RiseLine({
  children,
  delay = 0,
  immediate = false,
  className = '',
}: {
  children: ReactNode
  delay?: number
  immediate?: boolean
  className?: string
}) {
  const reduce = useReducedMotion()
  if (reduce) return <span className={`block ${className}`}>{children}</span>
  return (
    // The outer mask is observed (the moving inner line starts fully clipped, so it can't be).
    // Padding + negative margin give descenders and Arabic marks room inside the mask.
    <m.span className={`block overflow-hidden pb-[0.12em] -mb-[0.12em] ${className}`} {...trigger(immediate)}>
      <m.span
        className="block"
        variants={{ hidden: { y: '108%' }, shown: { y: '0%' } }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </m.span>
    </m.span>
  )
}

/** Gentle fade + rise for text blocks. Used sparingly. */
export function FadeIn({
  children,
  delay = 0,
  immediate = false,
  className = '',
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  immediate?: boolean
  className?: string
  as?: 'div' | 'p' | 'li'
}) {
  const reduce = useReducedMotion()
  const Tag = m[as]
  if (reduce) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }
  const shown = { opacity: 1, y: 0 }
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...(immediate ? { animate: shown } : { whileInView: shown, viewport: VIEWPORT })}
    >
      {children}
    </Tag>
  )
}

/** Vertical parallax offset (in px) for an element, disabled for reduced motion. */
export function useParallax(distance = 60): [RefObject<HTMLDivElement | null>, MotionValue<number> | number] {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  return [ref, reduce ? 0 : y]
}

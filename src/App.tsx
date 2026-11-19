import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { useCallback, useState } from 'react'
import { menu } from './data/menu'
import { Navigation } from './components/Navigation'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Featured } from './sections/Featured'
import { Menu, tabId } from './sections/Menu'
import { Gallery } from './sections/Gallery'
import { Instagram } from './sections/Instagram'
import { Footer } from './sections/Footer'

export default function App() {
  const [category, setCategory] = useState(menu[0].id)

  /** Used by the Featured section to jump straight to a category in the menu. */
  const openCategory = useCallback((id: string) => {
    setCategory(id)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('menu')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    requestAnimationFrame(() => document.getElementById(tabId(id))?.focus({ preventScroll: true }))
  }, [])

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <Navigation />
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero />
          <About />
          <Featured onOpenCategory={openCategory} />
          <Menu activeId={category} onSelect={setCategory} />
          <Gallery />
          <Instagram />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}

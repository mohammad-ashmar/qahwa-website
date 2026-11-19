import { useEffect, useState } from 'react'

/** Tracks which section currently crosses the upper third of the viewport. */
export function useActiveSection<T extends string>(ids: readonly T[]) {
  const [active, setActive] = useState<T>(ids[0])

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id as T)
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}

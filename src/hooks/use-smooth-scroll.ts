import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

import { useTranslation } from '@/i18n/language-context'

/**
 * Global smooth-scroll driver. Native scrollbars are already hidden globally
 * in index.css; Lenis interpolates the scrollTop so sections drift into
 * place with a cinematic easing curve.
 *
 * IMPORTANT: this hook MUST live inside `<LanguageProvider>`, because it
 * subscribes to `lang` to re-measure the document after each language
 * switch. Lenis caches `scrollHeight` as its internal limit; switching
 * languages reflows content (e.g. Contact's heading jumps from `text-8xl`
 * to `text-9xl`), enlarging the document, but Lenis's limit would stay
 * stuck at the old value — so the user would run out of scroll ~1/3 before
 * the real bottom. Explicitly calling `lenis.resize()` after every
 * `lang` change (and once fonts are ready) fixes this without relying on
 * Lenis's internal ResizeObserver catching the reflow in time.
 */
export function useSmoothScroll() {
  const { lang } = useTranslation()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    let rafId = 0
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Re-measure once web fonts settle — display fonts can ship several
    // hundred ms after the first paint and meaningfully change the
    // height of large headings (Hero, Contact).
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready
        .then(() => {
          lenisRef.current?.resize()
        })
        .catch(() => {})
    }

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Language switch → content reflows → document height changes → Lenis
  // needs to recompute its limit. Double rAF gives React one frame to
  // commit the new tree and the browser another frame to finish layout
  // before we ask Lenis for the new dimensions. If either frame fires
  // after unmount, `lenisRef.current` is already null and the chain
  // safely no-ops.
  useEffect(() => {
    let inner = 0
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        lenisRef.current?.resize()
      })
    })
    return () => {
      cancelAnimationFrame(outer)
      if (inner) cancelAnimationFrame(inner)
    }
  }, [lang])
}

import { CtaFooter } from '@/components/cta-footer'
import { ExperienceSplit } from '@/components/experience-split'
import { Hero } from '@/components/hero'
import { ProfileBento } from '@/components/profile-bento'
import { SiteNav } from '@/components/site-nav'
import { VibeGallery } from '@/components/vibe-gallery'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'
import { LanguageProvider } from '@/i18n/language-context'

function App() {
  return (
    <LanguageProvider>
      {/*
        `SmoothScrollDriver` is deliberately rendered INSIDE
        <LanguageProvider>: `useSmoothScroll` subscribes to `lang` so it can
        ask Lenis to re-measure the document after every language switch
        (English vs Chinese reflow the page by ~1 viewport due to headline
        size changes in Contact and elsewhere; Lenis must be told).
      */}
      <SmoothScrollDriver />
      {/*
        NOTE: use `overflow-x-clip` (not `overflow-x-hidden`). `hidden` turns
        <main> into a scroll container, which breaks `position: sticky` for
        every descendant (the sticky viewport inside <VibeGallery /> will no
        longer stick to the real viewport). `clip` visually clips horizontal
        overflow without creating a scroll container, preserving sticky.
      */}
      <main className="relative w-full overflow-x-clip bg-background text-foreground">
        <SiteNav />
        <Hero />
        <ProfileBento />
        <ExperienceSplit />
        <VibeGallery />
        <CtaFooter />
      </main>
    </LanguageProvider>
  )
}

function SmoothScrollDriver() {
  useSmoothScroll()
  return null
}

export default App

import { CtaFooter } from '@/components/cta-footer'
import { ExperienceSplit } from '@/components/experience-split'
import { Hero } from '@/components/hero'
import { ProfileBento } from '@/components/profile-bento'
import { SiteNav } from '@/components/site-nav'
import { VibeGallery } from '@/components/vibe-gallery'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'
import { LanguageProvider } from '@/i18n/language-context'

function App() {
  useSmoothScroll()

  return (
    <LanguageProvider>
      <main className="relative w-full overflow-x-hidden bg-background text-foreground">
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

export default App

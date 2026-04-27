import { MotionConfig, motion } from 'framer-motion'

import { AboutBridge } from '@/components/about-bridge'
import { CtaFooter } from '@/components/cta-footer'
import { ExperienceSplit } from '@/components/experience-split'
import { Hero } from '@/components/hero'
import { ProfileBento } from '@/components/profile-bento'
import { SiteNav } from '@/components/site-nav'
import { VibeGallery } from '@/components/vibe-gallery'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'
import { LanguageProvider } from '@/i18n/language-context'
import { curtainReveal } from '@/lib/motion'

function App() {
  return (
    <LanguageProvider>
      {/*
        `MotionConfig reducedMotion="user"` is the ONE place the whole
        app opts into `prefers-reduced-motion`. With this set, every
        `framer-motion` element in the tree automatically skips its
        transform/opacity animation when the OS flag is on — we don't
        have to sprinkle `useReducedMotion()` checks through every
        section. The per-component fallbacks we DO have (e.g.
        `<MaskedText>` degrades to a plain opacity fade) still apply
        because they use the hook directly; MotionConfig is additive,
        not overriding.
      */}
      <MotionConfig reducedMotion="user">
        {/*
          `SmoothScrollDriver` is deliberately rendered INSIDE
          <LanguageProvider>: `useSmoothScroll` subscribes to `lang` so it
          can ask Lenis to re-measure the document after every language
          switch (English vs Chinese reflow the page by ~1 viewport due to
          headline size changes in Contact and elsewhere; Lenis must be
          told).
        */}
        <SmoothScrollDriver />
        {/*
          `<SiteNav>` MUST live OUTSIDE `<motion.main>`. Why: SiteNav is
          `position: fixed`, and the CSS spec says a fixed descendant
          anchors to the nearest ancestor with a non-`none` transform
          (not the viewport). `<motion.main>`'s entry curtain animates
          via transform, and framer-motion leaves an identity transform
          (`translateY(0) scale(1)`) on the element even after the
          animation finishes — which is enough to silently re-parent
          SiteNav's fixed positioning to <main>'s bounding box. The
          nav would look fine at rest but would scroll away with the
          page, defeating the whole "sticky top" contract. Keeping nav
          outside the transformed subtree avoids the trap entirely.

          `position: sticky` is NOT affected — sticky resolves against
          its nearest scrolling ancestor, not a transform ancestor — so
          VibeGallery's sticky viewport inside <main> stays correct.
        */}
        <SiteNav />
        {/*
          NOTE: use `overflow-x-clip` (not `overflow-x-hidden`). `hidden`
          turns <main> into a scroll container, which breaks
          `position: sticky` for every descendant (the sticky viewport
          inside <VibeGallery /> will no longer stick to the real
          viewport). `clip` visually clips horizontal overflow without
          creating a scroll container, preserving sticky.

          SITE INTRO CURTAIN: `<motion.main>` runs `curtainReveal` once
          on mount — the document body arrives with a subtle scale
          0.98 → 1 + y 40 → 0 + opacity 0 → 1 gesture over 1.2s. This
          is the closest thing to a "page transition" in a routerless
          long-scroll SPA; it plays exactly once per visit and is NOT
          re-triggered on language switch.
        */}
        <motion.main
          initial="hidden"
          animate="visible"
          variants={curtainReveal}
          className="relative w-full overflow-x-clip bg-background text-foreground"
        >
          <Hero />
          <ProfileBento />
          <ExperienceSplit />
          {/*
            `<AboutBridge />` sits deliberately between Experience (02) and
            Works (03) — a single-screen "breath" with one line of
            statement copy and one 4:3 vibe-anchor image. See the
            component itself for the rationale; the ordering matters
            because the two flanking sections are the densest reading
            blocks on the page, and without a rest beat they collapse
            into one long résumé dump.
          */}
          <AboutBridge />
          <VibeGallery />
          <CtaFooter />
        </motion.main>
      </MotionConfig>
    </LanguageProvider>
  )
}

function SmoothScrollDriver() {
  useSmoothScroll()
  return null
}

export default App

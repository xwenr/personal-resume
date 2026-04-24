import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { BackgroundVideo } from '@/components/background-video'
import { useTranslation } from '@/i18n/language-context'
import {
  DURATION,
  EASE,
  HOVER_BUTTON,
  maskRise,
  staggerContainer,
} from '@/lib/motion'

export function Hero() {
  const { t, lang } = useTranslation()
  const hero = t.hero

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden"
    >
      <BackgroundVideo />

      {/* Very light warm wash — ties the video into the beige palette
          without fogging it (20% beige ≈ paper-thin gauze). */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-background/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-64 bg-gradient-to-t from-background to-transparent"
      />

      {/* Content column is ONE stagger container so the eyebrow, headline
          words, description, and CTAs cascade in a single orchestrated
          sequence instead of each child self-scheduling. `initial='hidden'
          animate='visible'` (not whileInView) because Hero is above the
          fold on load — the reveal must fire immediately on mount, not
          when the user scrolls. */}
      <motion.div
        key={lang}
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.08, 0.15)}
        className="relative z-10 flex h-full w-full flex-col"
      >
        <div className="flex-1" />
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center">
          {/* Eyebrow — short reveal, leads the cascade. */}
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: DURATION.default, ease: EASE },
              },
            }}
            className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/85 text-shadow-soft"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            {hero.available}
          </motion.span>

          {/* Headline — mask slide-up.
              Each word lives in its own `overflow-hidden` clipper; the
              inner <motion.span> rises from y:110% to y:0 so the glyph
              bodies (ink) rise out of the baseline slit. `inline-block` is
              critical on both layers — framer-motion animates `transform`,
              which needs block context; the clipper must also be
              `inline-block` so it shrinks to glyph width and doesn't stretch
              the whole line into a single bar.
              `pb-[0.12em]` gives the clipper a hair of vertical slack so
              descenders (g, y, p) aren't guillotined at rest. */}
          <h1 className="font-display text-6xl leading-[0.95] tracking-tighter text-balance text-white text-shadow-hero sm:text-7xl md:text-8xl">
            {hero.titleWords.map((word, i) => (
              <span
                key={`${lang}-${word}-${i}`}
                className="mr-4 inline-block overflow-hidden pb-[0.12em] align-baseline last:mr-0"
              >
                <motion.span
                  variants={maskRise}
                  style={{ display: 'inline-block' }}
                >
                  {word === '&' ? (
                    <em className="not-italic text-white/60">{word}</em>
                  ) : (
                    word
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: DURATION.long, ease: EASE },
              },
            }}
            className="mt-10 max-w-2xl text-pretty text-base leading-relaxed text-white/90 text-shadow-soft sm:text-lg"
          >
            {hero.description}
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: DURATION.long, ease: EASE },
              },
            }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            {/* CTA is motion.a — framer-motion owns the hover transform
                (scale 1.03). Previously this element also had a CSS
                `hover:scale-[1.03]` utility which competed with the motion
                transform; removed to keep a single source of truth. */}
            <motion.a
              href="#profile"
              whileHover={HOVER_BUTTON}
              whileTap={{ scale: 0.98 }}
              className="liquid-glass glass-hover inline-flex cursor-pointer items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-white text-shadow-soft"
            >
              {hero.viewPortfolio}
              <ArrowRight className="h-4 w-4" />
            </motion.a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-3 text-sm text-white/80 text-shadow-soft transition-colors hover:text-white"
            >
              {hero.sayHello}
            </a>
          </motion.div>
        </div>
        <div className="flex-1" />

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: DURATION.long, ease: EASE },
            },
          }}
          className="mx-auto flex w-full max-w-6xl items-end justify-between px-6 pb-10 text-xs uppercase tracking-[0.3em] text-white/75 text-shadow-soft"
        >
          <span>{hero.studioName}</span>
          <span className="hidden md:inline">{hero.est}</span>
          <span>{hero.scroll}</span>
        </motion.div>
      </motion.div>
    </section>
  )
}

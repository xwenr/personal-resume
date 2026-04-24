import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { BackgroundVideo } from '@/components/background-video'
import { useTranslation } from '@/i18n/language-context'

const EASE = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const { t, lang } = useTranslation()
  const hero = t.hero

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Z-0 background video */}
      <BackgroundVideo />

      {/* Very light warm wash — ties the video into the beige palette
          without fogging it (20% beige ≈ paper-thin gauze). */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-background/20"
      />
      {/* Bottom gradient — softens the hard cut into the next beige section. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-64 bg-gradient-to-t from-background to-transparent"
      />

      {/* Z-10 content — pure white text over the video, readability handled
          by text-shadow only. No background color on the text containers. */}
      <div className="relative z-10 flex h-full w-full flex-col">
        <div className="flex-1" />
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center">
          <motion.span
            key={`${lang}-available`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/85 text-shadow-soft"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            {hero.available}
          </motion.span>

          <h1 className="font-display text-6xl leading-[0.95] tracking-tighter text-balance text-white text-shadow-hero sm:text-7xl md:text-8xl">
            {hero.titleWords.map((word, i) => (
              <motion.span
                key={`${lang}-${word}-${i}`}
                initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.9,
                  ease: EASE,
                  delay: 0.15 + i * 0.08,
                }}
                className="mr-4 inline-block align-baseline last:mr-0"
              >
                {word === '&' ? (
                  <em className="not-italic text-white/60">{word}</em>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            key={`${lang}-description`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
            className="mt-10 max-w-2xl text-pretty text-base leading-relaxed text-white/90 text-shadow-soft sm:text-lg"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#profile"
              className="liquid-glass glass-hover inline-flex cursor-pointer items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-white text-shadow-soft hover:scale-[1.03]"
            >
              {hero.viewPortfolio}
              <ArrowRight className="h-4 w-4" />
            </a>
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="mx-auto flex w-full max-w-6xl items-end justify-between px-6 pb-10 text-xs uppercase tracking-[0.3em] text-white/75 text-shadow-soft"
        >
          <span>{hero.studioName}</span>
          <span className="hidden md:inline">{hero.est}</span>
          <span>{hero.scroll}</span>
        </motion.div>
      </div>
    </section>
  )
}

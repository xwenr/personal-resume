import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { BackgroundVideo } from '@/components/background-video'
import { useTranslation } from '@/i18n/language-context'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const { t, lang } = useTranslation()
  const titleWords = t.hero.titleWords

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Z-0 background video — 100% opacity, zero overlays above it */}
      <BackgroundVideo />

      {/* Z-10 content — pure text floating over the video.
          No background-colored wrappers, only text-shadow for readability. */}
      <div className="relative z-10 flex h-full w-full flex-col">
        <div className="flex-1" />
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/85 text-shadow-soft"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            {t.hero.available}
          </motion.span>

          <h1
            className={cn(
              'font-display leading-[0.95] tracking-tighter text-balance text-white text-shadow-hero',
              lang === 'zh'
                ? 'text-5xl sm:text-6xl md:text-7xl'
                : 'text-6xl sm:text-7xl md:text-8xl',
            )}
          >
            {titleWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.9,
                  ease: EASE,
                  delay: 0.15 + i * 0.08,
                }}
                className={cn(
                  'inline-block align-baseline last:mr-0',
                  lang === 'zh' ? 'mr-2 sm:mr-3' : 'mr-4',
                )}
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
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
            className="mt-10 max-w-2xl text-pretty text-base leading-relaxed text-white/90 text-shadow-soft sm:text-lg"
          >
            {t.hero.description}
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
              {t.hero.viewPortfolio}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-3 text-sm text-white/80 text-shadow-soft transition-colors hover:text-white"
            >
              {t.hero.sayHello}
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
          <span>{t.hero.studioName}</span>
          <span className="hidden md:inline">{t.hero.est}</span>
          <span>{t.hero.scroll}</span>
        </motion.div>
      </div>
    </section>
  )
}

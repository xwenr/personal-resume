import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'

import { useTranslation } from '@/i18n/language-context'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

export function SiteNav() {
  // When the nav is over the Hero's video, we render light text with
  // a text-shadow for readability; below the hero (on beige sections)
  // we switch back to the dark espresso palette.
  const { scrollY } = useScroll()
  const [isOverHero, setIsOverHero] = useState(true)
  const { lang, toggleLang, t } = useTranslation()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const threshold =
      typeof window !== 'undefined' ? window.innerHeight * 0.85 : 700
    setIsOverHero(y < threshold)
  })

  const navLinks = [
    { label: t.nav.profile, href: '#profile' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.works, href: '#works' },
    { label: t.nav.contact, href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 mx-auto flex w-[min(96%,80rem)] items-center justify-between bg-transparent px-6 py-6"
    >
      <a
        href="#hero"
        aria-label={t.nav.brand}
        className={cn(
          'font-display text-2xl leading-none tracking-tight transition-colors duration-500',
          isOverHero
            ? 'text-white text-shadow-soft'
            : 'text-foreground',
        )}
      >
        <motion.span
          key={lang}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="inline-block"
        >
          {t.nav.brand}
        </motion.span>
      </a>

      <div className="hidden items-center gap-8 md:flex">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={cn(
              'text-sm transition-colors duration-500',
              isOverHero
                ? 'text-white/75 text-shadow-soft hover:text-white'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleLang}
          aria-label={t.langSwitch.tooltip}
          title={t.langSwitch.tooltip}
          className={cn(
            'liquid-glass glass-hover inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-xs font-medium tracking-wide transition-colors duration-500',
            isOverHero
              ? 'text-white text-shadow-soft'
              : 'text-foreground',
          )}
        >
          <span
            className={cn(
              'transition-opacity duration-300',
              lang === 'zh' ? 'opacity-100' : 'opacity-50',
            )}
          >
            {t.langSwitch.zhShort}
          </span>
          <span
            className={cn(
              'opacity-40',
              isOverHero ? 'text-white/60' : 'text-muted-foreground',
            )}
          >
            /
          </span>
          <span
            className={cn(
              'transition-opacity duration-300',
              lang === 'en' ? 'opacity-100' : 'opacity-50',
            )}
          >
            {t.langSwitch.enShort}
          </span>
        </button>

        <a
          href="#contact"
          className={cn(
            'liquid-glass glass-hover hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-500 sm:inline-flex',
            isOverHero
              ? 'text-white text-shadow-soft'
              : 'text-foreground',
          )}
        >
          {t.nav.cta}
        </a>
      </div>
    </motion.nav>
  )
}

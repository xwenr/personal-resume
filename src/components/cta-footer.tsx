import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'

import { useTranslation } from '@/i18n/language-context'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

export function CtaFooter() {
  const { t, lang } = useTranslation()
  const contact = t.contact
  const titleWords = contact.titleWords

  return (
    <section
      id="contact"
      // Natural-height section — NO `min-h-screen` / `h-screen`. The
      // section hugs its content so the document ends immediately after
      // the copyright strip instead of padding the page with a screenful
      // of empty space.
      //
      // Vertical rhythm is controlled entirely by padding:
      //   • pt-32 md:pt-40   generous top padding gives the CTA room to
      //                      breathe after VibeGallery's sticky horizontal
      //                      track releases.
      //   • pb-10 md:pb-12   minimal bottom padding — scroll stops a
      //                      short, intentional beat below the footer.
      //
      // All children (eyebrow, headline, description, buttons, info row,
      // copyright strip) stay in normal document flow — nothing is
      // absolutely positioned — so the section's height is exactly
      // `padding + content`.
      className="relative z-20 flex w-full flex-col items-center bg-background px-6 pb-10 pt-32 text-center md:pb-12 md:pt-40"
    >
      <motion.span
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mb-10 text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        {contact.eyebrow}
      </motion.span>

      <h2
        className={cn(
          'max-w-6xl font-display leading-[0.95] tracking-tighter text-foreground',
          lang === 'zh'
            ? 'text-6xl md:text-8xl'
            : 'text-7xl md:text-9xl',
        )}
      >
        {titleWords.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            initial={{ opacity: 0, y: 80, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 1.1,
              ease: EASE,
              delay: 0.1 + i * 0.12,
            }}
            className={cn(
              'inline-block align-baseline last:mr-0',
              lang === 'zh' ? 'mr-2 md:mr-4' : 'mr-5',
            )}
          >
            {i === titleWords.length - 1 ? (
              <em className="not-italic text-muted-foreground">{word}</em>
            ) : (
              word
            )}
          </motion.span>
        ))}
      </h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
        className="mt-10 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        {contact.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
        className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
      >
        <a
          href={`mailto:${contact.email}`}
          className="liquid-glass glass-hover inline-flex cursor-pointer items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-foreground"
        >
          <Mail className="h-4 w-4" />
          {contact.sendEmail}
        </a>
        <a
          href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
          className="liquid-glass glass-hover inline-flex cursor-pointer items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-foreground"
        >
          <Phone className="h-4 w-4" />
          {contact.phone}
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.8 }}
        className="mt-8 flex flex-col items-center gap-1 text-xs uppercase tracking-[0.25em] text-muted-foreground sm:flex-row sm:gap-6"
      >
        <span className="inline-flex items-center gap-2">
          <span className="text-foreground/60">{contact.emailLabel}</span>
          <span className="text-foreground/90">{contact.email}</span>
        </span>
        <span className="hidden h-3 w-px bg-foreground/15 sm:inline-block" />
        <span className="inline-flex items-center gap-2">
          <span className="text-foreground/60">{contact.phoneLabel}</span>
          <span className="text-foreground/90">{contact.phone}</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: EASE, delay: 1 }}
        className="mt-20 flex w-full max-w-7xl flex-col items-center gap-3 border-t border-foreground/10 pt-8 text-xs uppercase tracking-[0.3em] text-muted-foreground sm:flex-row sm:justify-between"
      >
        <span>{contact.copyright}</span>
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${contact.email}`}
            className="transition-colors hover:text-foreground"
          >
            {contact.social.email}
          </a>
          <a
            href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
            className="transition-colors hover:text-foreground"
          >
            {contact.social.phone}
          </a>
        </div>
        <span>{contact.craftedWith}</span>
      </motion.div>
    </section>
  )
}

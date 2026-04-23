import { motion } from 'framer-motion'
import { Download, Mail } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const

const titleWords = ["Let's", 'Build', 'Together.']

export function CtaFooter() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[60vh] w-full flex-col items-center justify-center px-6 py-24 text-center md:py-32"
    >
      <motion.span
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mb-10 text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        04 — Contact
      </motion.span>

      <h2 className="max-w-6xl font-display text-7xl leading-[0.95] tracking-tighter text-foreground md:text-9xl">
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
            className="mr-5 inline-block align-baseline last:mr-0"
          >
            {word === 'Together.' ? (
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
        Open to full-time product roles, design collaborations and thoughtful
        conversations about AIGC, research and the shape of tomorrow's
        interfaces.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
        className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
      >
        <a
          href="/resume.pdf"
          className="liquid-glass glass-hover inline-flex cursor-pointer items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-foreground"
        >
          <Download className="h-4 w-4" />
          Download Resume
        </a>
        <a
          href="mailto:hello@velorah.studio"
          className="liquid-glass glass-hover inline-flex cursor-pointer items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-foreground"
        >
          <Mail className="h-4 w-4" />
          Send an Email
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: EASE, delay: 0.9 }}
        className="mt-24 flex w-full max-w-7xl flex-col items-center gap-3 border-t border-foreground/10 pt-8 text-xs uppercase tracking-[0.3em] text-muted-foreground sm:flex-row sm:justify-between"
      >
        <span>© 2026 Velorah Studio</span>
        <div className="flex items-center gap-6">
          <a href="#" className="transition-colors hover:text-foreground">
            Twitter
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            GitHub
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            LinkedIn
          </a>
        </div>
        <span>Crafted with care</span>
      </motion.div>
    </section>
  )
}

import * as React from 'react'
import { motion } from 'framer-motion'

import { MaskedText } from '@/components/ui/masked-text'
import { cn } from '@/lib/utils'
import { DURATION, EASE, revealViewport } from '@/lib/motion'

interface SectionHeadingProps {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
}

/**
 * Editorial section heading.
 *
 * NOTE: previously the entire block was a single `motion.header` with one
 * `opacity 0 → 1` fade animating the eyebrow, title, and description
 * together. When the title graduated to `<MaskedText>` (per-word mask
 * rise from y:110%), that outer `opacity` became a problem — for the
 * first ~0.8s the header was still semi-transparent, so the mask words
 * were rising but the audience couldn't see them. By the time opacity
 * reached 1, half the reveal had already happened behind a gauze.
 *
 * The fix is to keep `<header>` static and let each child run its own
 * independent reveal:
 *   - eyebrow  : short fade-up
 *   - h2/title : per-word mask rise (handled inside `<MaskedText>`)
 *   - description: longer fade-up, delayed 100ms so the eye settles on
 *                  the headline first
 *
 * All three share `revealViewport` so they fire together at the same
 * intersection threshold; the animations just don't sit inside each
 * other's opacity envelope anymore.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      {eyebrow ? (
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: DURATION.default, ease: EASE }}
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          {eyebrow}
        </motion.span>
      ) : null}

      <MaskedText
        as="h2"
        className="font-display text-4xl tracking-tighter text-foreground sm:text-5xl md:text-6xl"
      >
        {title}
      </MaskedText>

      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: DURATION.default, ease: EASE, delay: 0.1 }}
          className={cn(
            'text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg',
            align === 'center' ? 'max-w-2xl' : 'max-w-xl',
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </header>
  )
}

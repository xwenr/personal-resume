import * as React from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

import { DURATION, EASE, MASK_STAGGER, revealViewport } from '@/lib/motion'

type MaskedTag = 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4'

interface MaskedTextProps {
  children: React.ReactNode
  /** Outer DOM tag. Defaults to `span` so callers keep control of heading
   *  semantics (they render an `<h2>` around the component, not the other
   *  way round). */
  as?: MaskedTag
  className?: string
  /** Seconds between each word / node rising. */
  stagger?: number
  /** Seconds to wait before the first word rises, once the reveal has
   *  been triggered. */
  delay?: number
  /** `inView` (default) plays when the element crosses the viewport edge
   *  (matches `revealViewport`'s -100px pre-roll). `mount` plays
   *  immediately — use only for above-the-fold headings that must not
   *  wait for a scroll event. */
  trigger?: 'inView' | 'mount'
}

type Unit =
  | { kind: 'word'; text: string }
  | { kind: 'space' }
  | { kind: 'node'; element: React.ReactNode }

/**
 * Flatten React children into a sequential list of mask units.
 *
 *   - Strings / numbers: tokenised on whitespace so each word can rise
 *     independently; consecutive whitespace collapses into a single
 *     `space` unit (rendered as a literal space text node so the browser
 *     keeps normal line-breaking between inline-block clippers).
 *   - ReactElements (e.g. `<em>emphasis</em>`): kept intact as one block.
 *     We do NOT reach into their DOM to animate their glyphs — the
 *     whole element rises as a single editorial "slat", preserving
 *     italics, colour, weight, and any nested markup.
 *   - Fragments: flattened recursively so callers can pass
 *     `<>{prefix}{' '}<em>{em}</em></>` without extra wrapping spans.
 *   - Arrays: flattened (covers `children={words.map(...)}` usage).
 */
function buildUnits(children: React.ReactNode): Unit[] {
  const out: Unit[] = []

  const visit = (node: React.ReactNode) => {
    if (node == null || typeof node === 'boolean') return

    if (typeof node === 'string' || typeof node === 'number') {
      const tokens = String(node).split(/(\s+)/)
      for (const tok of tokens) {
        if (tok === '') continue
        if (/^\s+$/.test(tok)) out.push({ kind: 'space' })
        else out.push({ kind: 'word', text: tok })
      }
      return
    }

    if (Array.isArray(node)) {
      node.forEach(visit)
      return
    }

    if (React.isValidElement(node) && node.type === React.Fragment) {
      visit((node.props as { children?: React.ReactNode }).children)
      return
    }

    out.push({ kind: 'node', element: node })
  }

  visit(children)
  return out
}

// Per-word / per-block lift. Duration mirrors `DURATION.long` so multi-word
// headings still finish inside one breath even with aggressive stagger.
const itemVariants: Variants = {
  hidden: { y: '110%' },
  visible: {
    y: 0,
    transition: { duration: DURATION.long, ease: EASE },
  },
}

// Reduced-motion fallback — flat opacity fade on the whole block. No y,
// no stagger, no per-word choreography. Keeps the "arriving" feeling
// without any motion on the vestibular axis.
const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.default, ease: EASE },
  },
}

/**
 * `<MaskedText>` — editorial mask-rise for headings and key copy.
 *
 * Strings are split per-word; each word sits in its own `overflow-hidden`
 * inline-block clipper and its inner `<motion.span>` rises from
 * `y:110%` → `y:0` along the shared `EASE` cubic-bezier. ReactElement
 * children (e.g. `<em>`) animate as a single block so their italic /
 * colour styling is preserved verbatim.
 *
 * CRITICAL implementation notes:
 *   - The clipper MUST be `inline-block`. If it stays `inline`, the clip
 *     box collapses onto the baseline and chops glyph ascenders.
 *   - `pb-[0.12em]` pads the clipper below the baseline so descenders
 *     (g, y, p) aren't guillotined when the word is at rest.
 *   - `align-baseline` keeps consecutive clippers on the same baseline;
 *     without it `inline-block` would align to the bottom of the clipper
 *     box (including its `pb` slack), floating the line.
 *   - Spaces are rendered as normal text nodes between clippers — NOT as
 *     `mr-[0.25em]` on the clippers — so the browser's line-breaker can
 *     still wrap long headings naturally at word boundaries.
 */
export function MaskedText({
  children,
  as: Tag = 'span',
  className,
  stagger = MASK_STAGGER,
  delay = 0,
  trigger = 'inView',
}: MaskedTextProps) {
  const prefersReduced = useReducedMotion()
  const units = buildUnits(children)

  const triggerProps =
    trigger === 'mount'
      ? ({ initial: 'hidden', animate: 'visible' } as const)
      : ({
          initial: 'hidden',
          whileInView: 'visible',
          viewport: revealViewport,
        } as const)

  if (prefersReduced) {
    return (
      <Tag className={className}>
        <motion.span
          {...triggerProps}
          variants={fadeVariants}
          transition={{ delay }}
          style={{ display: 'inline' }}
        >
          {children}
        </motion.span>
      </Tag>
    )
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  return (
    <Tag className={className}>
      <motion.span
        {...triggerProps}
        variants={containerVariants}
        style={{ display: 'inline' }}
      >
        {units.map((unit, i) => {
          if (unit.kind === 'space') {
            return <React.Fragment key={`sp-${i}`}>{' '}</React.Fragment>
          }
          return (
            <span
              key={`u-${i}`}
              className="inline-block overflow-hidden pb-[0.12em] align-baseline"
            >
              <motion.span
                variants={itemVariants}
                style={{ display: 'inline-block' }}
              >
                {unit.kind === 'word' ? unit.text : unit.element}
              </motion.span>
            </span>
          )
        })}
      </motion.span>
    </Tag>
  )
}

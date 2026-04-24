import type { Variants } from 'framer-motion'

/**
 * Liquid Editorial motion system.
 *
 * One module owns every animation constant in the app — duration, easing,
 * variants, hover physics. Previously each component declared its own local
 * `EASE` and `duration`, which drifted over time and produced a soft
 * inconsistency (some reveals snapped, others floated). Centralising them
 * here makes the motion language a first-class design token, on par with
 * `--foreground` and `--radius` in `index.css`.
 *
 * Why these specific values:
 *   - `EASE = [0.16, 1, 0.3, 1]`: a more aggressive variant of the classic
 *     "ease-out expo". The first control point sits at x=0.16 (vs. the
 *     0.22 we used before) so motion starts faster, then decelerates for
 *     a long, frictionless tail. It feels heavier — physical glass
 *     sliding to rest, not a web page fading in.
 *   - `DURATION.default = 0.8`: long enough to register without feeling
 *     slow. Editorial sites live around 0.7–1.0s for reveals; we picked
 *     0.8 as the middle ground and 1.2 for hero-grade one-shots.
 *   - `revealViewport` with `margin: '-100px'`: reveals fire 100px BEFORE
 *     the element crosses the viewport edge, so by the time the user's
 *     eye reaches it, the animation is already ~halfway done. Without
 *     this, elements pop in right under the cursor and the reveal reads
 *     as a glitch rather than choreography.
 *   - `once: true`: Awwwards-grade sites never re-animate on scroll back
 *     up. Replaying feels tacky and wastes attention.
 */

export const EASE = [0.16, 1, 0.3, 1] as const

export const EASE_OUT_SOFT = 'easeOut' as const

export const DURATION = {
  /** Micro-interactions (hover, tap, small state changes). */
  micro: 0.4,
  /** Section reveals, card entries. */
  default: 0.8,
  /** Hero / oversized editorial reveals that anchor a whole section. */
  long: 1.2,
} as const

export const revealViewport = {
  once: true,
  margin: '-100px',
} as const

/* -------------------------------------------------------------------------- */
/*  Variants — composable building blocks.                                    */
/* -------------------------------------------------------------------------- */

/** Fade-up from 40px below final position. The default for almost everything. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.default, ease: EASE },
  },
}

/** Same shape as `fadeUp` but with a shorter travel — for smaller tokens
 *  (eyebrows, meta chips) where 40px would feel like too much. */
export const fadeUpTight: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.default, ease: EASE },
  },
}

/** Simple opacity fade, no translate. Reserve for elements whose position
 *  you don't want to disturb (e.g. large background videos, full-bleed
 *  imagery where a y offset would expose the seam). */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.long, ease: EASE },
  },
}

/**
 * Mask slide-up. Wrap the text in `overflow-hidden` and apply these variants
 * to an inner `<motion.span>` (or block). The outer node clips the glyphs
 * as they rise from y:100% to y:0, giving a cinematic "slat reveal" that
 * word-by-word fades cannot match.
 *
 * Pair with `staggerContainer` on the parent so multiple masked words
 * cascade in sequence.
 */
export const maskRise: Variants = {
  hidden: { y: '110%' },
  visible: {
    y: 0,
    transition: { duration: DURATION.long, ease: EASE },
  },
}

/**
 * Parent container that orchestrates staggered children. Call it as a
 * function so each component can dial the timing:
 *
 *   `variants={staggerContainer(0.1, 0.15)}`
 *
 * 0.1s between children is the Awwwards sweet spot — any slower and the
 * later cards feel stranded; any faster and it reads as one event.
 */
export const staggerContainer = (
  staggerChildren = 0.1,
  delayChildren = 0.1,
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
})

/* -------------------------------------------------------------------------- */
/*  Hover physics — liquid-glass tactile response.                            */
/* -------------------------------------------------------------------------- */

/**
 * Card-grade hover: a 2px rise only. No scale — and this is deliberate.
 *
 * We tried `scale: 1.01` first (borrowed straight from the Awwwards
 * reference). On this site it produced a noticeable softening of every
 * glyph inside the card the moment hover began. Two compounding causes:
 *
 *  1. `scale: 1.01` is a non-integer, sub-pixel factor. The browser can't
 *     map text glyph pixels onto the device pixel grid cleanly anymore,
 *     so it sub-pixel resamples them. The edges go from crisp to fuzzy.
 *  2. `.liquid-glass` uses `backdrop-filter: blur(12px)`, which forces
 *     the element into its own GPU compositing layer. The instant a
 *     transform animates, the text layer swaps from CPU rasterisation to
 *     GPU rasterisation mid-hover — a well-known source of weight/edge
 *     wobble on Chromium.
 *
 * Dropping `scale` fixes both in one move. Physical feedback is carried
 * by the y-lift plus the `.glass-hover:hover` shadow/border/bg ramp in
 * index.css (light hitting the glass). Do NOT re-add `scale` here — if
 * the interaction ever feels too subtle, raise `y` to -3 or deepen the
 * CSS shadow, but keep the transform integer-friendly.
 *
 * CSS rule of engagement is unchanged: framer-motion owns the transform
 * channel; CSS owns shadow / border / background. Don't cross the streams.
 */
export const HOVER_CARD = {
  y: -2,
  transition: { duration: DURATION.micro, ease: EASE_OUT_SOFT },
} as const

/** Button-grade hover: slightly bolder scale, no y lift (buttons are
 *  smaller, a y lift reads as a drift rather than a press). */
export const HOVER_BUTTON = {
  scale: 1.03,
  transition: { duration: DURATION.micro, ease: EASE_OUT_SOFT },
} as const

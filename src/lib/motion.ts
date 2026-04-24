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

/**
 * Per-word mask-rise stagger. 0.08s is the editorial sweet spot — fast
 * enough that long headings don't crawl, slow enough that each word is
 * individually legible as it rises. Exported so `<MaskedText>` and any
 * ad-hoc mask sequence (e.g. Hero h1) read from a single source.
 */
export const MASK_STAGGER = 0.08

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
/*  Macro curtains — whole-page / whole-asset entries.                        */
/* -------------------------------------------------------------------------- */

/**
 * Site-wide entry curtain — wraps `<main>` once on mount so the whole
 * document arrives with a single unified "welcome" gesture instead of
 * each section individually fading in underneath the first one. This is
 * the closest thing we have to a page transition in a routerless long-
 * scroll SPA; it fires exactly once per visit and does NOT replay on
 * language switch (per-section `key={lang}` handles that narrower case).
 *
 * scale 0.98 → 1 + y 40 → 0 + opacity 0 → 1 is intentionally subtle —
 * the dramatic work is done by the Hero's clip-path video reveal
 * underneath; the curtain's job is just to make the first paint feel
 * intentional rather than abrupt.
 */
export const curtainReveal: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: DURATION.long, ease: EASE },
  },
}

/**
 * Cinematic clip-path curtain — for large visual assets (hero video,
 * full-bleed imagery) that should "arrive" instead of "appear". Starts
 * fully hidden behind its own top edge (`inset(100% 0 0 0)`) and wipes
 * open downward.
 *
 * Pair with a subtle `scale: 1.1 → 1.0` on the INNER `<motion.img>` /
 * `<motion.video>` so the subject breathes forward while the curtain
 * opens — the composite reads as a camera push, not a CSS effect.
 *
 * 1.5s is deliberately longer than `DURATION.long` because a clip-path
 * reveal on its own feels too fast at 1.2s — the eye hasn't located the
 * element before it's already done.
 */
export const clipCurtain: Variants = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1.5, ease: EASE },
  },
}

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

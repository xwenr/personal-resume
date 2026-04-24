import { motion, useTransform, type MotionValue } from 'framer-motion'

import { EASE, irisReveal } from '@/lib/motion'

/**
 * Served from /public as a static asset. Replace the file at
 * `public/hero-bg.mp4` to swap backgrounds without touching code.
 *
 * The query-string is a cache-buster so that browsers fetch the fresh
 * file whenever the underlying asset is overwritten.
 */
const VIDEO_SRC = '/hero-bg.mp4?v=3'

interface BackgroundVideoProps {
  /**
   * Hero section's scroll progress MotionValue (0 → 1 across the hero's
   * height). Driven by `useScroll` in the Hero component so the video
   * can parallax-drift independently of the page scroll speed.
   */
  scrollYProgress: MotionValue<number>
}

/**
 * Cinematic background video.
 *
 * TWO layers of motion, deliberately separated:
 *
 *   1. Outer `<motion.div>` — iris `clip-path` reveal. On mount the
 *      element is clipped to a zero-radius circle at dead centre
 *      (`circle(0% at 50% 50%)`); over 1.8s with a symmetric
 *      ease-in-out the circle expands out past the screen corners,
 *      like a camera aperture opening. This is the "lens is arriving"
 *      gesture that anchors the whole hero.
 *
 *   2. Inner `<motion.video>` — a subtle `scale 1.1 → 1.0` co-playing
 *      with the iris (SAME 1.8s window so the two gestures read as one
 *      event, not two) so the subject breathes forward while the lens
 *      opens. Without this, the clip-path alone reads as a CSS effect;
 *      with it, the composite reads as a slow dolly push through an
 *      opening aperture.
 *
 *   3. Parallax — the inner video also drifts `y: 0% → 15%` tied to
 *      Hero section scroll. Post-mount the user scrolls and the video
 *      moves slightly slower than the rest of the page, giving the
 *      whole hero a sense of depth without eating more of the frame
 *      than the bottom gradient gauze already handles.
 *
 * CRITICAL: the parallax `y` must live on the INNER <video>, not the
 * outer wrap. `clip-path` on the wrap does NOT use the transform
 * channel, but we still split the concerns so the iris stays on its
 * own GPU layer and scroll-driven `y` updates never touch the clip.
 */
export function BackgroundVideo({ scrollYProgress }: BackgroundVideoProps) {
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={irisReveal}
      className="absolute inset-0 z-0 overflow-hidden"
    >
      <motion.video
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 1.8, ease: EASE }}
        style={{ y }}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </motion.video>
    </motion.div>
  )
}

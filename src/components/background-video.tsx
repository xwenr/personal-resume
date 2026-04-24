import { motion, useTransform, type MotionValue } from 'framer-motion'

import { EASE, clipCurtain } from '@/lib/motion'

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
 *   1. Outer `<motion.div>` — `clip-path` curtain. On mount the element
 *      is fully hidden behind its own top edge (`inset(100% 0 0 0)`);
 *      it wipes open downward over 1.5s. This is the "camera is
 *      arriving" gesture that sets up the whole hero.
 *
 *   2. Inner `<motion.video>` — a subtle `scale 1.1 → 1.0` co-playing
 *      with the wipe (same 1.5s window) so the subject breathes forward
 *      while the curtain opens. Without this, the clip-path alone reads
 *      as a CSS effect; with it, the composite reads as a slow camera
 *      push.
 *
 *   3. Parallax — the inner video also drifts `y: 0% → 15%` tied to
 *      Hero section scroll. Post-mount the user scrolls and the video
 *      moves slightly slower than the rest of the page, giving the
 *      whole hero a sense of depth without eating more of the frame
 *      than the bottom gradient gauze already handles.
 *
 * CRITICAL: the parallax `y` must live on the INNER <video>, not the
 * outer wrap. If it sits on the wrap, it fights the clip-path transform
 * (framer-motion stacks both into the same `transform` channel) and the
 * wipe on mount reads as a drift.
 */
export function BackgroundVideo({ scrollYProgress }: BackgroundVideoProps) {
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={clipCurtain}
      className="absolute inset-0 z-0 overflow-hidden"
    >
      <motion.video
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 1.5, ease: EASE }}
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

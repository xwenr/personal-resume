import { useEffect, useState } from 'react'
import { motion, useTransform, type MotionValue } from 'framer-motion'

import { EASE, irisReveal } from '@/lib/motion'

/**
 * Served from /public as a static asset. Replace the file at
 * `public/hero-bg.mp4` to swap backgrounds without touching code.
 *
 * The query-string is a cache-buster so that browsers fetch the fresh
 * file whenever the underlying asset is overwritten.
 */
/** Bump when replacing `public/hero-bg.mp4` so CDN/browser pick up new bytes. */
const VIDEO_SRC = '/hero-bg.mp4?v=6'

/** Desktop-first: narrow viewports skip MP4 entirely (cellular + CPU). */
const MOBILE_MAX_PX = 767

function scheduleIdle(run: () => void, timeoutMs = 1800): () => void {
  if (typeof window === 'undefined') return () => {}
  const ric = window.requestIdleCallback
  if (typeof ric === 'function') {
    const id = ric(() => run(), { timeout: timeoutMs })
    return () => window.cancelIdleCallback?.(id)
  }
  const t = window.setTimeout(run, 400)
  return () => clearTimeout(t)
}

interface BackgroundVideoProps {
  scrollYProgress: MotionValue<number>
}

export function BackgroundVideo({ scrollYProgress }: BackgroundVideoProps) {
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  const [mountVideo, setMountVideo] = useState(false)

  useEffect(() => {
    const mqMobile = window.matchMedia(`(max-width: ${MOBILE_MAX_PX}px)`)
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')

    const saveData =
      typeof navigator !== 'undefined' &&
      'connection' in navigator &&
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData === true

    const evaluate = () => {
      if (mqMobile.matches || mqReduce.matches || saveData) {
        setMountVideo(false)
        return
      }
      return scheduleIdle(() => setMountVideo(true))
    }

    let cancelIdle: (() => void) | undefined
    const run = () => {
      cancelIdle?.()
      cancelIdle = evaluate() ?? undefined
    }

    run()
    mqMobile.addEventListener('change', run)
    mqReduce.addEventListener('change', run)

    return () => {
      cancelIdle?.()
      mqMobile.removeEventListener('change', run)
      mqReduce.removeEventListener('change', run)
    }
  }, [])

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={irisReveal}
      className="absolute inset-0 z-0 overflow-hidden"
    >
      {/* Instant backdrop — avoids black frame while MP4 buffers (large files / slow CDN). */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-amber-100/45 via-background to-stone-300/30"
      />

      {mountVideo ? (
        <motion.video
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 1.8, ease: EASE }}
          style={{ y }}
          className="absolute inset-0 h-full w-full bg-transparent object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </motion.video>
      ) : null}
    </motion.div>
  )
}

/**
 * Served from /public as a static asset. Replace the file at
 * `public/hero-bg.mp4` to swap backgrounds without touching code.
 *
 * The query-string is a cache-buster so that browsers fetch the fresh
 * file whenever the underlying asset is overwritten.
 */
const VIDEO_SRC = '/hero-bg.mp4?v=3'

export function BackgroundVideo() {
  return (
    <video
      className="absolute inset-0 z-0 h-full w-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    >
      <source src={VIDEO_SRC} type="video/mp4" />
    </video>
  )
}

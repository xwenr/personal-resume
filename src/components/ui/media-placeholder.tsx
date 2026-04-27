import { Image as ImageIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface MediaPlaceholderProps {
  /**
   * CSS aspect-ratio value. Matches what `<img>` / `<figure>` will lock
   * to once a real asset is dropped in — giving us an identical
   * footprint during the design phase and preventing layout shift on
   * the swap. Common values: `'1/1'`, `'4/3'`, `'3/4'`, `'16/9'`.
   */
  aspectRatio?: string
  /**
   * Short lowercase identifier ("portrait", "vibe anchor", ...) shown
   * in the micro-legend so reviewers can tell which slot goes with
   * which direction without reading the surrounding code.
   */
  label?: string
  className?: string
}

/**
 * `<MediaPlaceholder />` — editorial stand-in for a yet-to-arrive
 * image, photograph or illustration.
 *
 * Not a grey box with "IMG" written on it. The placeholder is tuned to
 * the site's warm-paper palette so layouts read correctly during the
 * design phase: reviewers can judge spacing, rhythm and alignment
 * without the "blank canvas" tricking the eye into seeing holes.
 *
 * Composition:
 *   1. warm-paper base (`foreground/[0.03]`)            — plate
 *   2. 135° pinstripe grain at ~2.5% opacity           — fine texture
 *   3. inset hairline frame (`foreground/15`, 3px pad)  — "passe-partout"
 *   4. centre glyph + micro-legend                      — slot ID
 *
 * The aspect-ratio is locked via CSS `aspect-ratio` on the wrapper, so
 * swapping in a real asset is a one-line change — the layout doesn't
 * move, only the content inside the frame does.
 *
 * Accessibility: the wrapper is `role="img"` with an explicit
 * `aria-label` describing that it's a placeholder awaiting its final
 * asset; screen readers announce "image: portrait placeholder, 4/3
 * ratio, awaiting final asset" instead of reading every nested
 * decorative element.
 */
export function MediaPlaceholder({
  aspectRatio = '4/3',
  label = 'image',
  className,
}: MediaPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`${label} placeholder · ${aspectRatio} ratio · awaiting final asset`}
      style={{ aspectRatio }}
      className={cn(
        'relative flex w-full items-center justify-center overflow-hidden',
        'bg-foreground/[0.03]',
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, transparent 0 10px, rgba(58,46,42,0.03) 10px 11px)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 border border-foreground/15"
      />
      <div className="relative flex flex-col items-center gap-3 text-muted-foreground">
        <ImageIcon className="h-8 w-8 opacity-40" strokeWidth={1.25} />
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em]">
          <span>{label}</span>
          <span aria-hidden className="text-foreground/25">
            ·
          </span>
          <span>{aspectRatio}</span>
        </div>
      </div>
    </div>
  )
}

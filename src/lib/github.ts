/**
 * Small utilities for rendering GitHub repo metadata on project cards.
 */

// A hand-picked subset of GitHub's official language → hex mapping.
// Unlisted languages fall back to a neutral espresso.
const LANGUAGE_COLOURS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Vue: '#41b883',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Shell: '#89e051',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Jupyter: '#DA5B0B',
  'Jupyter Notebook': '#DA5B0B',
  Svelte: '#ff3e00',
  Astro: '#ff5a03',
  Solidity: '#AA6746',
  R: '#198CE7',
  MATLAB: '#e16737',
  'MDX': '#fcb32c',
  'Markdown': '#083fa1',
}

export function languageColour(language: string | null | undefined): string {
  if (!language) return 'rgba(58,46,42,0.45)'
  return LANGUAGE_COLOURS[language] ?? 'rgba(58,46,42,0.45)'
}

/**
 * Compact relative-time formatter ("2 months ago" / "2 个月前") tuned for
 * the small space under each project card.
 */
export function relativeTime(
  iso: string | null | undefined,
  lang: 'zh' | 'en',
  now: Date = new Date(),
): string {
  if (!iso) return ''
  const then = new Date(iso)
  if (Number.isNaN(then.getTime())) return ''

  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000)
  const units: Array<[number, string, string]> = [
    [60 * 60 * 24 * 365, '年前', 'y'],
    [60 * 60 * 24 * 30, '个月前', 'mo'],
    [60 * 60 * 24 * 7, '周前', 'w'],
    [60 * 60 * 24, '天前', 'd'],
    [60 * 60, '小时前', 'h'],
    [60, '分钟前', 'm'],
  ]

  for (const [size, zhLabel, enLabel] of units) {
    const value = Math.floor(seconds / size)
    if (value >= 1) {
      return lang === 'zh' ? `${value} ${zhLabel}` : `${value}${enLabel} ago`
    }
  }
  return lang === 'zh' ? '刚刚' : 'just now'
}

/** Compact star count: 1234 → "1.2k". */
export function formatStars(n: number): string {
  if (n >= 10000) return `${(n / 1000).toFixed(0)}k`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

/**
 * Merges the hand-written `works.config.ts` with the build-time
 * `github-repos.generated.ts` into a flat, locale-aware list consumed by
 * the UI.
 *
 * Precedence rules:
 *   title    → config.title (required, falls back to the repo name if blank)
 *   subtitle → config.subtitle → GitHub description → ''
 *   meta     → config.meta → "{language} · ★{stars} · {year}" synthesised
 *   ctaUrl   → config.externalUrl → GitHub html_url
 */
import type { Locale } from '@/i18n/translations'
import { WORKS_CONFIG, type WorkConfig } from './works.config'
import { githubRepos } from './github-repos.generated'

export type GithubMeta = {
  fullName: string
  description: string
  language: string | null
  stars: number
  url: string
  updatedAt: string
  homepage: string
  topics: readonly string[]
}

export type ResolvedWork = {
  slug: string
  title: string
  subtitle: string
  tag: string
  meta: string
  accent: string
  cover?: string
  mockVariant?: 0 | 1 | 2
  ctaUrl?: string
  github?: GithubMeta
}

type RawRepoRecord = {
  fullName?: string
  description?: string
  language?: string | null
  stars?: number
  htmlUrl?: string
  updatedAt?: string
  homepage?: string
  topics?: readonly string[]
}

// The generated JSON mixes per-repo records with a `__fetchedAt` timestamp,
// so we widen via `unknown` and probe each slot defensively.
const repoIndex = githubRepos as unknown as Record<string, unknown>

function pickRepo(slug: string | undefined): GithubMeta | undefined {
  if (!slug) return undefined
  const raw = repoIndex[slug]
  if (!raw || typeof raw !== 'object') return undefined
  const record = raw as RawRepoRecord
  if (!record.htmlUrl) return undefined
  return {
    fullName: record.fullName ?? slug,
    description: record.description ?? '',
    language: record.language ?? null,
    stars: record.stars ?? 0,
    url: record.htmlUrl,
    updatedAt: record.updatedAt ?? '',
    homepage: record.homepage ?? '',
    topics: record.topics ?? [],
  }
}

function synthesiseMeta(
  github: GithubMeta | undefined,
  lang: Locale,
): string {
  if (!github) return ''
  const parts: string[] = []
  if (github.updatedAt) {
    const year = github.updatedAt.slice(0, 4)
    if (year) parts.push(year)
  }
  if (github.language) parts.push(github.language)
  if (github.stars > 0) {
    parts.push(lang === 'zh' ? `★ ${github.stars}` : `★ ${github.stars}`)
  }
  return parts.join(' · ')
}

function pickTitle(w: WorkConfig, lang: Locale, github?: GithubMeta): string {
  const handwritten = w.title[lang].trim()
  if (handwritten) return handwritten
  if (github) return github.fullName.split('/').pop() ?? w.slug
  return w.slug
}

function pickSubtitle(w: WorkConfig, lang: Locale, github?: GithubMeta): string {
  const handwritten = w.subtitle[lang].trim()
  if (handwritten) return handwritten
  return github?.description ?? ''
}

function pickMeta(w: WorkConfig, lang: Locale, github?: GithubMeta): string {
  const handwritten = w.meta[lang].trim()
  if (handwritten) return handwritten
  return synthesiseMeta(github, lang)
}

export function resolveWorks(lang: Locale): ResolvedWork[] {
  return WORKS_CONFIG.map((w) => {
    const github = pickRepo(w.github)
    return {
      slug: w.slug,
      title: pickTitle(w, lang, github),
      subtitle: pickSubtitle(w, lang, github),
      tag: w.tag[lang],
      meta: pickMeta(w, lang, github),
      accent: w.accent,
      cover: w.cover,
      mockVariant: w.mockVariant,
      ctaUrl: w.externalUrl ?? github?.url,
      github,
    }
  })
}

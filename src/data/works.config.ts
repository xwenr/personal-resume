/**
 * Project showcase configuration.
 *
 * - `title` / `subtitle` / `tag` / `meta` are **hand-written** here (bilingual).
 *   Leave `subtitle.zh` or `subtitle.en` as `''` to let the GitHub `description`
 *   field fill in automatically after `npm run fetch:github`.
 * - GitHub metadata (language / stars / pushed_at) is pulled at build time
 *   by `scripts/fetch-github.mjs` into `github-repos.generated.ts`.
 *
 * To add a project, append an entry to `WORKS_CONFIG`. Set `github` to
 * `username/repo` to enable auto-fetch, or omit for non-GitHub projects.
 */
export type BilingualText = { zh: string; en: string }

export type WorkConfig = {
  /** Stable, URL-friendly identifier — used for the future `/works/:slug` page. */
  slug: string
  /** GitHub `owner/repo` — empty / undefined = non-GitHub project. */
  github?: string
  /** Pill label shown on the card (e.g. "Solo Project" / "Market Research"). */
  tag: BilingualText
  /** Displayed title — defaults to the repo name if left empty. */
  title: BilingualText
  /**
   * Short description. If blank, the component falls back to the
   * GitHub `description` field. If that is also empty, the subtitle area
   * is hidden.
   */
  subtitle: BilingualText
  /**
   * Meta line: year / stack / category. If blank, a best-effort summary
   * is synthesised from GitHub data: "{language} · ★{stars} · {year}".
   */
  meta: BilingualText
  /** Tailwind gradient classes applied to the card surface. */
  accent: string
  /**
   * Optional poster image, resolved relative to the /public folder
   * (e.g. '/works/fruit-tea-liquor.png'). Rendered at a fixed 3:4 ratio
   * in the Polaroid hero area — the gradient `accent` shows through as a
   * subtle frame while the image is loading or when no cover is provided.
   * When omitted, the abstract PolaroidMock is drawn instead.
   */
  cover?: string
  /**
   * Explicit override for the abstract PolaroidMock variant when no cover
   * is supplied. Useful for "Coming Soon"-style cards that should mirror
   * a specific existing card's mock.
   *   0 → editor-card mock (dots + text + tile trio)
   *   1 → wave lines
   *   2 → weekly bar chart
   * Omit to fall back to `index % 3`, which is fine for most cards.
   */
  mockVariant?: 0 | 1 | 2
  /**
   * Optional link override — click-through target for the card CTA.
   * Falls back to the GitHub URL if not set.
   */
  externalUrl?: string
  /**
   * Optional "live demo / showcase" link. Takes precedence over the
   * GitHub repo's `homepage` field. Use for hand-picked demo URLs
   * (e.g. an embedded showcase hosted elsewhere in /public).
   */
  liveUrl?: string
}

export const WORKS_CONFIG: WorkConfig[] = [
  {
    slug: 'resumeflow',
    github: 'xwenr/resumeflow',
    tag: { zh: '独立项目', en: 'Solo Project' },
    title: { zh: 'ResumeFlow', en: 'ResumeFlow' },
    // TODO(xin): replace this placeholder with a real product description.
    subtitle: {
      zh: '个人简历构建工具 —— 探索模板化内容生成与可视化导出的交互实验。',
      en: 'A résumé-building playground exploring templated content generation and visual export.',
    },
    meta: { zh: '', en: '' },
    accent: 'from-amber-300/40 to-orange-200/20',
    cover: '/works/resumeflow.png',
    liveUrl: 'https://resumeflow.1715786877.workers.dev/',
  },
  {
    slug: 'travel-plan',
    github: 'xwenr/travel-plan',
    tag: { zh: '独立项目', en: 'Solo Project' },
    title: { zh: 'Travel Plan', en: 'Travel Plan' },
    // TODO(xin): replace this placeholder with a real product description.
    subtitle: {
      zh: '基于 Vue 的轻量旅行规划原型 —— 行程编排、兴趣点地图与时间轴视图。',
      en: 'A lightweight Vue-based trip-planning prototype — itinerary builder, POI mapping and timeline view.',
    },
    meta: { zh: '', en: '' },
    accent: 'from-lime-300/35 to-amber-200/20',
    cover: '/works/travel-plan.png',
    liveUrl: 'https://travel-plan-5ec.pages.dev/',
  },
  {
    slug: 'promptory',
    github: 'xwenr/promptory',
    tag: { zh: '独立项目', en: 'Solo Project' },
    title: { zh: 'Promptory', en: 'Promptory' },
    // TODO(xin): replace this placeholder with a real product description.
    subtitle: {
      zh: 'Prompt 资产管理的 TypeScript 小工具 —— 沉淀、复用与结构化检索创作提示词。',
      en: 'A TypeScript playground for curating, reusing and structurally searching creative prompts.',
    },
    meta: { zh: '', en: '' },
    accent: 'from-stone-300/50 to-neutral-200/20',
    cover: '/works/promptory.png',
  },
  {
    slug: 'fruit-tea-liquor',
    github: 'xwenr/Fruit-Tea-Liquor',
    tag: { zh: '市场调查', en: 'Market Research' },
    title: {
      zh: '果茶酒行业洞察',
      en: 'Fruit Tea & Liquor Insight',
    },
    subtitle: {
      zh: '正大杯全国大学生市场调查与分析大赛小程序原型：结合 PEST、SWOT 分析行业与企业，使用 K-means 聚类与 Logistic 回归建模消费者行为，并通过 4P 与 STP 框架输出营销建议。',
      en: 'Prototype for the Zhengda Cup national market-research contest. Pairs PEST / SWOT industry analysis with K-means clustering and logistic regression on consumer behaviour, delivering 4P & STP marketing recommendations for the fruit-tea-liquor category.',
    },
    meta: {
      zh: '2023 · 市场调查 · 小程序原型',
      en: '2023 · Market Research · Mini-program Prototype',
    },
    accent: 'from-rose-300/40 to-amber-200/20',
    cover: '/works/fruit-tea-liquor.png',
    // Opens the awards viewer with the Showcase tab pre-activated.
    liveUrl: '/awards/index.html?id=zhengda&tab=showcase',
  },
  {
    slug: 'more-coming',
    tag: { zh: 'Coming Soon', en: 'Coming Soon' },
    title: { zh: '更多作品正在孵化', en: 'More Works Incubating' },
    subtitle: {
      zh: '正在沉淀更多侧项目与开源作品 —— 关于 AIGC 交互、数据可视化与产品原型实验。',
      en: 'Side-projects and open-source work taking shape — AIGC interactions, data viz and product prototyping experiments.',
    },
    meta: { zh: '2026 · 持续更新', en: '2026 · Ongoing' },
    accent: 'from-rose-300/40 to-amber-200/20',
    mockVariant: 0,
  },
]

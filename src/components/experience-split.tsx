import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/ui/section-heading'
import { useTranslation } from '@/i18n/language-context'
import { cn } from '@/lib/utils'
import {
  fadeUp,
  HOVER_CARD,
  revealViewport,
  staggerContainer,
} from '@/lib/motion'

const MOCK_COMPONENTS: Record<string, React.FC> = {
  'haima-cloud': AigcModelsMock,
  xianxiang: DataPipelineMock,
  jiqizhixin: WeeklyReportMock,
  'feishu-shennuo': ComplianceMock,
  jll: ResearchReportMock,
}

export function ExperienceSplit() {
  const { t } = useTranslation()
  const exp = t.experience

  return (
    <section id="experience" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={exp.eyebrow}
          title={
            <>
              {exp.titlePrefix}{' '}
              <em className="font-display italic text-muted-foreground">
                {exp.titleEmphasis}
              </em>
              {exp.titleSuffix}
            </>
          }
          description={exp.description}
          className="mb-16 max-w-3xl"
        />

        <div className="flex flex-col gap-16 md:gap-24">
          {exp.items.map((item, i) => {
            const Mock = MOCK_COMPONENTS[item.id] ?? AigcModelsMock
            return (
              // Each item is its own stagger container so the narrative
              // column and the mock column arrive with a slight offset,
              // producing a subtle "editorial split" read. Odd rows flip
              // order via `md:order-*` so the stagger still feels natural
              // (the column you read first enters first, regardless of
              // which side of the page it sits on).
              <motion.article
                key={item.id}
                initial="hidden"
                whileInView="visible"
                viewport={revealViewport}
                variants={staggerContainer(0.15, 0)}
                className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12"
              >
                {/* LEFT — narrative */}
                <motion.div
                  variants={fadeUp}
                  className={cn(
                    'md:col-span-7',
                    i % 2 === 1 && 'md:order-2',
                  )}
                >
                  <div className="mb-2 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    <span className="font-display text-2xl leading-none tracking-tight text-foreground/80">
                      0{i + 1}
                    </span>
                    <span className="h-px flex-1 bg-foreground/10" />
                    <span>{item.period}</span>
                  </div>

                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <Badge variant="default" className="text-sm">
                      {item.company}
                    </Badge>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
                    {item.role}
                  </h3>

                  <p className="mt-5 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                    {item.narrative}
                  </p>

                  <ul className="mt-6 space-y-3 text-sm text-muted-foreground md:text-[0.95rem]">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="mt-[10px] h-[3px] w-4 shrink-0 bg-foreground/40"
                        />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* RIGHT — visual mock */}
                <motion.div
                  variants={fadeUp}
                  whileHover={HOVER_CARD}
                  className={cn(
                    'liquid-glass glass-hover relative aspect-[5/4] w-full overflow-hidden p-6',
                    'md:col-span-5',
                    i % 2 === 1 && 'md:order-1',
                  )}
                >
                  <div className="flex items-start justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    <span className="max-w-[75%] truncate">
                      {item.company}
                    </span>
                    <span>0{i + 1}</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <Mock />
                  </div>
                </motion.div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Mock visuals — one per internship, all built from flat glass + SVG only.  */
/* -------------------------------------------------------------------------- */

function AigcModelsMock() {
  const models = [
    { name: 'Video Gen', tint: 'bg-amber-400/50' },
    { name: 'Image Gen', tint: 'bg-rose-400/50' },
    { name: 'Audio Gen', tint: 'bg-emerald-500/50' },
    { name: 'Upscale', tint: 'bg-sky-400/50' },
  ]
  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      <div className="rounded-2xl border border-foreground/10 bg-background/70 p-4 backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>RunningHub · Models</span>
          <span>100+</span>
        </div>
        <div className="space-y-2">
          {models.map((m, idx) => (
            <div
              key={m.name}
              className="flex items-center gap-3 rounded-xl border border-foreground/10 bg-foreground/[0.03] px-3 py-2.5"
            >
              <span className={cn('h-2 w-2 rounded-full', m.tint)} />
              <span className="flex-1 text-xs text-foreground">{m.name}</span>
              <div className="h-1 w-14 overflow-hidden rounded-full bg-foreground/10">
                <div
                  className="h-full rounded-full bg-foreground/50"
                  style={{ width: `${60 + idx * 10}%` }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground">
                v{1 + idx}.{idx}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-700/25 bg-emerald-700/[0.08] px-3 py-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-emerald-800">
            250+ pricing rules
          </span>
          <span className="text-[10px] text-foreground/70">dual-currency</span>
        </div>
      </div>
    </div>
  )
}

function DataPipelineMock() {
  const steps = ['Ingest', 'Parse', 'Tag', 'Output']
  return (
    <div className="relative w-full max-w-[320px]">
      <div className="rounded-2xl border border-foreground/10 bg-background/70 p-5 backdrop-blur-md">
        <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>Transaction Pipeline</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-foreground/15 bg-foreground/[0.04] px-2 py-0.5 normal-case tracking-normal">
            Web<span className="text-muted-foreground/60">→</span>Mini
          </span>
        </div>
        <div className="flex items-center justify-between gap-1">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-1">
              <div className="flex-1 rounded-lg border border-foreground/10 bg-foreground/[0.04] px-2 py-3 text-center">
                <div className="mb-1 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                  0{i + 1}
                </div>
                <div className="text-[11px] font-medium text-foreground">
                  {s}
                </div>
              </div>
              {i < steps.length - 1 && (
                <span
                  className="h-px w-2 shrink-0 bg-foreground/30"
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-1.5">
          {[78, 62, 44].map((w, i) => (
            <div
              key={i}
              className="h-1.5 overflow-hidden rounded-full bg-foreground/10"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-foreground/60 to-foreground/20"
                style={{ width: `${w}%` }}
              />
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>structured output</span>
          <span className="text-foreground/80">99.2%</span>
        </div>
      </div>
    </div>
  )
}

function WeeklyReportMock() {
  return (
    <div className="relative w-full max-w-[320px]">
      <div className="relative rounded-2xl border border-foreground/10 bg-background/70 p-5 backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>AI Weekly</span>
          <span>Vol. 20+</span>
        </div>
        <div className="mb-4 font-display text-xl leading-tight tracking-tight text-foreground">
          Multimodal LLMs, Agents & Embodied AI
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full rounded-full bg-foreground/45" />
          <div className="h-2 w-5/6 rounded-full bg-foreground/30" />
          <div className="h-2 w-4/6 rounded-full bg-foreground/20" />
          <div className="h-2 w-3/6 rounded-full bg-foreground/15" />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          {[
            { v: '20+', l: 'Bulletins' },
            { v: '20k', l: 'chars / issue' },
            { v: '3', l: 'Verticals' },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-lg border border-foreground/10 bg-foreground/[0.03] px-2 py-2"
            >
              <div className="font-display text-base leading-none text-foreground">
                {s.v}
              </div>
              <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -right-3 -top-3 rounded-full border border-foreground/10 bg-background/80 px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground backdrop-blur-md">
        2024 – 2025
      </div>
    </div>
  )
}

function ComplianceMock() {
  const rows = [
    { label: 'Tier A', status: 'safe', width: 82 },
    { label: 'Tier B', status: 'warn', width: 58 },
    { label: 'Tier C', status: 'risk', width: 34 },
  ]
  return (
    <div className="relative w-full max-w-[320px]">
      <div className="rounded-2xl border border-foreground/10 bg-background/70 p-5 backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>Compliance Monitor</span>
          <span>Daily</span>
        </div>
        <div className="mb-4 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="rounded-full border border-foreground/15 bg-foreground/[0.04] px-2 py-0.5">
            Meta
          </span>
          <span className="rounded-full border border-foreground/15 bg-foreground/[0.04] px-2 py-0.5">
            TikTok
          </span>
          <span className="rounded-full border border-foreground/15 bg-foreground/[0.04] px-2 py-0.5">
            Google
          </span>
          <span className="ml-auto text-foreground/60">SQL</span>
        </div>
        <div className="mb-4 grid grid-cols-7 items-end gap-1.5">
          {[30, 55, 40, 72, 48, 65, 80].map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}px` }}
              className="w-full rounded-t-sm bg-gradient-to-t from-foreground/50 to-foreground/15"
            />
          ))}
        </div>
        <div className="space-y-2.5">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center gap-3">
              <span className="w-12 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {r.label}
              </span>
              <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10">
                <div
                  style={{ width: `${r.width}%` }}
                  className={cn(
                    'h-full rounded-full',
                    r.status === 'safe' && 'bg-emerald-600/70',
                    r.status === 'warn' && 'bg-amber-500/70',
                    r.status === 'risk' && 'bg-rose-500/70',
                  )}
                />
              </div>
              <span className="text-[10px] text-foreground/70">{r.width}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ResearchReportMock() {
  const points = [
    { x: 40, y: 55, r: 3, o: 0.75 },
    { x: 92, y: 30, r: 2, o: 0.5 },
    { x: 140, y: 48, r: 4, o: 0.9 },
    { x: 188, y: 38, r: 2, o: 0.5 },
    { x: 238, y: 32, r: 3, o: 0.7 },
    { x: 68, y: 22, r: 1.5, o: 0.4 },
    { x: 118, y: 62, r: 1.5, o: 0.4 },
    { x: 168, y: 20, r: 2, o: 0.5 },
    { x: 214, y: 58, r: 1.5, o: 0.4 },
  ]
  const blocks = [
    { v: 'Q4', l: 'Quarterly' },
    { v: 'EV', l: 'Vertical' },
    { v: 'IC', l: 'Electronics' },
  ]
  return (
    <div className="relative w-full max-w-[320px]">
      <div className="rounded-2xl border border-foreground/10 bg-background/70 p-5 backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>JLL Research</span>
          <span>Q1 · 2024</span>
        </div>

        <div className="mb-4 font-display text-xl leading-tight tracking-tight text-foreground">
          West China · Logistics
        </div>

        <div className="relative mb-4 h-20 overflow-hidden rounded-lg border border-foreground/10 bg-foreground/[0.03]">
          <svg
            viewBox="0 0 280 80"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={i * 47 + 10}
                y1={0}
                x2={i * 47 + 10}
                y2={80}
                stroke="rgba(58,46,42,0.07)"
                strokeWidth="0.5"
              />
            ))}
            {Array.from({ length: 3 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1={0}
                y1={20 + i * 20}
                x2={280}
                y2={20 + i * 20}
                stroke="rgba(58,46,42,0.07)"
                strokeWidth="0.5"
              />
            ))}
            <path
              d="M40 55 Q 92 30, 140 48 T 238 32"
              stroke="rgba(58,46,42,0.4)"
              strokeWidth="0.8"
              fill="none"
              strokeDasharray="2.5 2.5"
            />
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={p.r}
                fill={`rgba(58,46,42,${p.o})`}
              />
            ))}
          </svg>
          <span className="absolute bottom-1.5 right-2 text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
            ArcGIS
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          {blocks.map((s) => (
            <div
              key={s.l}
              className="rounded-lg border border-foreground/10 bg-foreground/[0.03] px-2 py-2"
            >
              <div className="font-display text-base leading-none text-foreground">
                {s.v}
              </div>
              <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

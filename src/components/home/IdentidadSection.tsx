import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Reveal from '../shared/Reveal'

const VALUES = [
  { titleKey: 'identity.values.v1_title', descKey: 'identity.values.v1_desc' },
  { titleKey: 'identity.values.v2_title', descKey: 'identity.values.v2_desc' },
  { titleKey: 'identity.values.v3_title', descKey: 'identity.values.v3_desc' },
  { titleKey: 'identity.values.v4_title', descKey: 'identity.values.v4_desc' },
] as const

const STATS = [
  { target: 4,    prefix: '',  suffix: '',  label: 'Personas en el equipo' },
  { target: 8,   prefix: '+', suffix: '',  label: 'Proyectos entregados'  },
  { target: 2024, prefix: '',  suffix: '',  label: 'Año de fundación'      },
] as const

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? target
      : 0
  ))
  const startedRef = useRef(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respeta prefers-reduced-motion: muestra el valor final sin animar.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !startedRef.current) {
        startedRef.current = true
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - t, 3)
          setCount(Math.round(eased * target))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.4 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}

function StatItem({ target, prefix, suffix, label }: (typeof STATS)[number]) {
  const { count, ref } = useCountUp(target)
  return (
    <div ref={ref} className="text-center sm:text-left">
      <p className="text-4xl sm:text-5xl font-black text-black tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>
        {prefix}{count.toLocaleString('es-ES')}{suffix}
      </p>
      <p className="mt-1 text-sm text-gray-500">{label}</p>
    </div>
  )
}

export default function IdentidadSection() {
  const { t } = useTranslation()
  const narrativeParagraphs = t('identity.narrative_body').split('\n\n')

  return (
    <section id="quienes-somos" className="bg-white">

      {/* Header + Stats */}
      <div className="py-8 sm:py-12 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="left">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
              {t('nav.identity')}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black leading-tight max-w-xl">
              {t('identity.section_title')}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-5 flex flex-col sm:flex-row gap-8 sm:gap-16">
              {STATS.map((s) => <StatItem key={s.label} {...s} />)}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Narrativa */}
      <div className="py-10 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <Reveal variant="left">
              <h3 className="text-xl sm:text-2xl font-black text-black">{t('identity.narrative_title')}</h3>
              <div className="mt-6 space-y-4">
                {narrativeParagraphs.map((p, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed">{p}</p>
                ))}
              </div>
            </Reveal>
            <Reveal variant="right" delay={80}>
              <div className="bg-black text-white p-8 sm:p-10">
                <blockquote className="text-lg sm:text-xl font-black leading-snug">
                  {t('identity.quote')}
                </blockquote>
                <cite className="mt-6 block text-sm text-gray-400 not-italic">
                  — {t('identity.quote_author')}
                </cite>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Valores */}
      <div className="bg-black text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="left">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-8 sm:mb-10">Cómo trabajamos</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {VALUES.map(({ titleKey, descKey }, i) => (
              <Reveal key={titleKey} delay={i * 70} variant="up" className="bg-black">
                <div className="p-6 sm:p-8">
                  <span className="text-xs font-mono text-gray-600">0{i + 1}</span>
                  <p className="mt-3 font-black text-white text-base leading-tight">{t(titleKey)}</p>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">{t(descKey)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Equipo */}
      <div className="py-10 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="up">
            <div className="border-2 border-black p-6 sm:p-8 lg:p-12 max-w-3xl">
              <h3 className="text-2xl sm:text-3xl font-black text-black">{t('identity.team_title')}</h3>
              <div className="mt-4 space-y-4">
                {t('identity.team_intro').split('\n\n').map((p, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

    </section>
  )
}

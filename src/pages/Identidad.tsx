import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Reveal from '../components/shared/Reveal'
import { useMeta } from '../hooks/useMeta'

const STATS = [
  { target: 4,    prefix: '',  suffix: '',  label: 'Personas en el equipo' },
  { target: 8,   prefix: '+', suffix: '',  label: 'Proyectos entregados'  },
  { target: 2024, prefix: '',  suffix: '',  label: 'Año de fundación'      },
] as const

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(() => (
    typeof window === 'undefined' || !('IntersectionObserver' in window) ? target : 0
  ))
  const startedRef = useRef(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !startedRef.current) {
        startedRef.current = true
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          setCount(Math.round((1 - Math.pow(1 - t, 3)) * target))
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
    <div ref={ref}>
      <p
        className="text-4xl sm:text-5xl font-black text-black tabular-nums"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {prefix}{count.toLocaleString('es-ES')}{suffix}
      </p>
      <p className="mt-2 text-sm text-gray-500">{label}</p>
    </div>
  )
}

const VALUES = [
  { titleKey: 'identity.values.v1_title', descKey: 'identity.values.v1_desc' },
  { titleKey: 'identity.values.v2_title', descKey: 'identity.values.v2_desc' },
  { titleKey: 'identity.values.v3_title', descKey: 'identity.values.v3_desc' },
  { titleKey: 'identity.values.v4_title', descKey: 'identity.values.v4_desc' },
] as const

export default function Identidad() {
  useMeta({
    title: 'Quiénes somos',
    description:
      'Somos un equipo técnico pequeño que trabaja directamente con el cliente. Quien te escucha en la primera reunión es quien escribe el código.',
  })
  const { t } = useTranslation()

  const narrativeParagraphs = t('identity.narrative_body').split('\n\n')

  return (
    <main>
      {/* Hero */}
      <section className="py-20 bg-white border-b border-black/10"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><p className="text-xs uppercase tracking-widest text-gray-400 mb-4">{t('nav.identity')}</p><h1 className="text-4xl lg:text-5xl font-black text-black leading-tight max-w-xl">{t('identity.section_title')}</h1></div></section>

      {/* Stats — separados del hero para no saturar */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-16">
            {STATS.map((s) => <StatItem key={s.label} {...s} />)}
          </div>
        </div>
      </section>

      {/* Narrativa */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <Reveal>
              <h2
                className="text-2xl sm:text-3xl font-black text-black"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('identity.narrative_title')}
              </h2>
              <div className="mt-6 space-y-5">
                {narrativeParagraphs.map((p, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed">{p}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="bg-black text-white p-8 sm:p-10">
                <blockquote
                  className="text-lg sm:text-xl font-black leading-snug text-white"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {t('identity.quote')}
                </blockquote>
                <cite className="mt-7 block text-sm text-gray-400 not-italic">
                  — {t('identity.quote_author')}
                </cite>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-black py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow-light mb-10 sm:mb-14">Cómo trabajamos</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map(({ titleKey, descKey }, i) => (
              <Reveal key={titleKey} delay={i * 90}>
                <div className="bg-black p-6 sm:p-8 h-full">
                  <p
                    className="font-black text-white text-base leading-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {t(titleKey)}
                  </p>
                  <p className="mt-3 text-sm text-gray-400 leading-relaxed">{t(descKey)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="border border-black/10 p-8 sm:p-10 lg:p-12 max-w-3xl">
              <h2
                className="text-2xl sm:text-3xl font-black text-black"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('identity.team_title')}
              </h2>
              <div className="mt-5 space-y-5">
                {t('identity.team_intro').split('\n\n').map((p, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

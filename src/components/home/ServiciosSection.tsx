import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Reveal from '../shared/Reveal'
import SplitCard from '../shared/SplitCard'

const DEV_PROCESS = [
  { titleKey: 'services.dev.process1', descKey: 'services.dev.process1_desc' },
  { titleKey: 'services.dev.process2', descKey: 'services.dev.process2_desc' },
  { titleKey: 'services.dev.process3', descKey: 'services.dev.process3_desc' },
] as const

function CardLeft({
  title,
  subtitle,
  body,
  details,
  cta,
}: {
  title: string
  subtitle: string
  body: string
  details: string[]
  cta: string
}) {
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-2xl sm:text-3xl font-black text-black">{title}</h3>
      <p className="mt-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">{subtitle}</p>
      <p className="mt-4 text-gray-700 leading-relaxed">{body}</p>
      <ul className="mt-6 space-y-2">
        {details.map((d) => (
          <li key={d} className="flex items-start gap-2 text-sm text-gray-700">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
            <span>{d}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Link
          to="/contacto"
          className="inline-flex items-center gap-2 bg-black text-white text-sm font-semibold px-6 py-3 hover:bg-gray-900 focus-accent transition-colors"
        >
          {cta} →
        </Link>
      </div>
    </div>
  )
}

function ProcessList({ title }: { title: string }) {
  const { t } = useTranslation()
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">{title}</p>
      <ol className="space-y-5">
        {DEV_PROCESS.map(({ titleKey, descKey }, i) => (
          <li
            key={titleKey}
            className="border-t border-white/10 pt-5 first:border-t-0 first:pt-0"
          >
            <div className="flex items-baseline gap-3 mb-1.5">
              <span
                aria-hidden="true"
                className="font-mono text-xs"
                style={{ color: 'var(--accent)' }}
              >
                0{i + 1}
              </span>
              <p className="font-semibold text-sm">{t(titleKey)}</p>
            </div>
            {/* Barra de progreso animada: aparece con el reveal, da feedback visual de avance */}
            <div className="ml-7 mt-2 h-px bg-white/10 overflow-hidden" aria-hidden="true">
              <span
                className="block h-px process-bar"
                style={{
                  width: `${100 - i * 18}%`,
                  backgroundColor: 'var(--accent)',
                  animationDelay: `${i * 120}ms`,
                }}
              />
            </div>
            <p className="ml-7 mt-2 text-gray-400 text-sm leading-relaxed">{t(descKey)}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function ServiciosSection() {
  const { t } = useTranslation()

  return (
    <section id="servicios" className="py-10 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal variant="left">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 flex items-center">
            <span
              aria-hidden="true"
              className="inline-block w-1.5 h-1.5 mr-2"
              style={{ backgroundColor: 'var(--accent)' }}
            />
            Servicios
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-black mb-10 sm:mb-16">{t('services.section_title')}</h2>
        </Reveal>

        <div className="flex flex-col gap-6 sm:gap-8">
          <Reveal variant="up">
            <SplitCard
              left={
                <CardLeft
                  title={t('services.dev.title')}
                  subtitle={t('services.dev.subtitle')}
                  body={t('services.dev.body')}
                  details={[
                    'Aplicaciones web y herramientas internas para tu equipo',
                    'Automatización de procesos manuales o repetitivos',
                    'Integraciones entre sistemas que no se hablan entre sí',
                    'Paneles de control y reportes adaptados a tu operativa',
                  ]}
                  cta={t('services.dev.cta')}
                />
              }
              right={
                <ProcessList title={t('services.dev.right_title')} />
              }
            />
          </Reveal>

          <Reveal variant="up" delay={120}>
            <SplitCard
              left={
                <CardLeft
                  title={t('services.consulting.title')}
                  subtitle={t('services.consulting.subtitle')}
                  body={t('services.consulting.body')}
                  details={[
                    'Identificamos qué procesos se benefician realmente de la IA',
                    'Automatización de tareas repetitivas con resultados medibles',
                    'Asistentes y herramientas de IA adaptados a tu forma de trabajar',
                    'Seguimiento y ajuste después de cada implementación',
                  ]}
                  cta={t('services.consulting.cta')}
                />
              }
              right={
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">{t('services.consulting.right_title')}</p>
                  <ul className="space-y-4">
                    {(['metric1', 'metric2', 'metric3'] as const).map((key) => (
                      <li key={key} className="flex items-start gap-3 text-sm">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 pulse-dot"
                          style={{ color: 'var(--accent)' }}
                        >
                          ✓
                        </span>
                        <span className="text-gray-300">{t(`services.consulting.${key}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              }
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Reveal from '../shared/Reveal'
import SplitCard from '../shared/SplitCard'

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
            <span aria-hidden="true" className="mt-1.5 shrink-0" style={{ width: '0.5rem', height: '0.5rem', backgroundColor: 'var(--accent)' }} />
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

export default function ServiciosSection() {
  const { t } = useTranslation()

  return (
    <section id="servicios" className="py-10 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal variant="left">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Servicios</p>
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
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">{t('services.dev.right_title')}</p>
                  <div className="space-y-5">
                    <div>
                      <p className="font-semibold text-sm">{t('services.dev.process1')}</p>
                      <p className="text-gray-400 text-sm mt-1">{t('services.dev.process1_desc')}</p>
                    </div>
                    <div className="border-t border-white/10 pt-5">
                      <p className="font-semibold text-sm">{t('services.dev.process2')}</p>
                      <p className="text-gray-400 text-sm mt-1">{t('services.dev.process2_desc')}</p>
                    </div>
                    <div className="border-t border-white/10 pt-5">
                      <p className="font-semibold text-sm">{t('services.dev.process3')}</p>
                      <p className="text-gray-400 text-sm mt-1">{t('services.dev.process3_desc')}</p>
                    </div>
                  </div>
                </div>
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
                        <span aria-hidden="true" className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>✓</span>
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

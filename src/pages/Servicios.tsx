import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import SplitCard from '../components/shared/SplitCard'

function PageHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="bg-white border-b border-black/10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-black text-black">{title}</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">{subtitle}</p>
      </div>
    </section>
  )
}

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
      <h2 className="text-3xl font-black text-black">{title}</h2>
      <p className="mt-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">{subtitle}</p>
      <p className="mt-4 text-gray-700 leading-relaxed">{body}</p>
      <ul className="mt-6 space-y-2">
        {details.map((d) => (
          <li key={d} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="mt-0.5 font-bold">—</span>
            <span>{d}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Link
          to="/contacto"
          className="inline-flex items-center gap-2 bg-black text-white text-sm font-semibold px-6 py-3 hover:bg-gray-900 transition-colors"
        >
          {cta} →
        </Link>
      </div>
    </div>
  )
}

export default function Servicios() {
  const { t } = useTranslation()

  return (
    <main>
      <PageHero
        title={t('services.section_title')}
        subtitle={t('cta_banner.subtitle')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col gap-8">

          {/* Software a Medida */}
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

          {/* IA Integrada */}
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
                      <span className="text-white mt-0.5 shrink-0">✓</span>
                      <span className="text-gray-300">{t(`services.consulting.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            }
          />

        </div>
      </div>
    </main>
  )
}

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
          {/* Desarrollo a Medida */}
          <SplitCard
            left={
              <CardLeft
                title={t('services.dev.title')}
                subtitle={t('services.dev.subtitle')}
                body={t('services.dev.body')}
                details={[
                  'APIs RESTful y GraphQL con OpenAPI/AsyncAPI',
                  'Arquitectura hexagonal y Domain-Driven Design',
                  'Microservicios con Apache Kafka',
                  'Modernización de sistemas legacy',
                ]}
                cta={t('cta_banner.cta')}
              />
            }
            right={
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">{t('services.dev.right_title')}</p>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-sm">{t('services.dev.case1_name')}</p>
                    <p className="text-gray-400 text-sm mt-1">{t('services.dev.case1_desc')}</p>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <p className="font-semibold text-sm">{t('services.dev.case2_name')}</p>
                    <p className="text-gray-400 text-sm mt-1">{t('services.dev.case2_desc')}</p>
                  </div>
                </div>
              </div>
            }
          />

          {/* Consultoría IA */}
          <SplitCard
            left={
              <CardLeft
                title={t('services.consulting.title')}
                subtitle={t('services.consulting.subtitle')}
                body={t('services.consulting.body')}
                details={[
                  'Auditoría de procesos candidatos a automatización con IA',
                  'Diseño e integración de sistemas RAG en producción',
                  'Arquitecturas multi-agente con LangChain4j, MCP y Spring AI',
                  'Evaluación y observabilidad de modelos en producción',
                ]}
                cta={t('cta_banner.cta')}
              />
            }
            right={
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">{t('services.consulting.right_title')}</p>
                <ul className="space-y-3">
                  {(['metric1', 'metric2', 'metric3'] as const).map((key) => (
                    <li key={key} className="flex items-start gap-2 text-sm">
                      <span className="text-white mt-0.5">✓</span>
                      <span>{t(`services.consulting.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            }
          />

          {/* Innovación y Financiación */}
          <SplitCard
            left={
              <CardLeft
                title={t('services.innovation.title')}
                subtitle={t('services.innovation.subtitle')}
                body={t('services.innovation.body')}
                details={[
                  'Identificación de convocatorias Next Generation, CDTI, ENISA',
                  'Redacción de memoria técnica y justificación económica',
                  'Seguimiento y reporting durante la ejecución del proyecto',
                  'Auditoría de elegibilidad previa sin coste',
                ]}
                cta={t('cta_banner.cta')}
              />
            }
            right={
              <div className="flex flex-col justify-between h-full">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">{t('services.innovation.right_title')}</p>
                  <div className="inline-flex items-center border border-white/30 px-3 py-1.5 text-xs">
                    ✓ {t('services.innovation.badge')}
                  </div>
                </div>
                <Link
                  to="/contacto"
                  className="mt-8 inline-block bg-white text-black text-sm font-semibold px-5 py-2.5 hover:bg-gray-100 transition-colors self-start"
                >
                  {t('services.innovation.cta')} →
                </Link>
              </div>
            }
          />
        </div>
      </div>
    </main>
  )
}

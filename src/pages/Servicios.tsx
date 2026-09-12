import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Reveal from '../components/shared/Reveal'
import { useMeta } from '../hooks/useMeta'

interface ServiceCardProps {
  title: string
  subtitle: string
  body: string
  details: string[]
  cta: string
  process: { title: string; desc?: string }[]
  processTitle: string
}

function ServiceCard({
  title,
  subtitle,
  body,
  details,
  cta,
  process,
  processTitle,
}: ServiceCardProps) {
  return (
    <div className="flex flex-col h-full border-2 border-black">
      <div className="grid grid-cols-1 lg:grid-cols-5 w-full">
        <div className="lg:col-span-3 p-8 sm:p-10 lg:p-12 flex flex-col">
          <h2
            className="text-2xl sm:text-3xl font-black text-black leading-tight tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h2>
          <p
            className="mt-3 text-[0.7rem] font-semibold text-gray-500 uppercase tracking-[0.18em]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {subtitle}
          </p>
          <p className="mt-6 text-gray-700 leading-relaxed">{body}</p>
          <ul className="mt-7 space-y-3">
            {details.map((d) => (
              <li key={d} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                <span className="mt-2 h-px w-4 bg-black shrink-0" aria-hidden="true" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <Link to="/contacto" className="bg-black text-white font-semibold px-6 py-3 text-sm hover:bg-gray-900 transition-colors inline-flex">
              {cta}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-2 bg-black text-white p-8 sm:p-10 lg:p-12 flex flex-col">
          <p className="eyebrow-light">{processTitle}</p>
          <ul className="mt-7 space-y-6 flex-1">
            {process.map((step) => (
              <li
                key={step.title}
                className="border-t border-white/15 pt-5 first:border-t-0 first:pt-0"
              >
                <p className="text-sm text-white leading-relaxed">{step.title}</p>
                {step.desc && (
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function Servicios() {
  useMeta({
    title: 'Servicios',
    description:
      'Desarrollo de software a medida e integración de IA para empresas. Aplicaciones web, automatizaciones y herramientas internas construidas por el equipo que te las entrega.',
  })
  const { t } = useTranslation()

  const services: ServiceCardProps[] = [
    {
      title: t('services.dev.title'),
      subtitle: t('services.dev.subtitle'),
      body: t('services.dev.body'),
      details: [
        'Aplicaciones web y herramientas internas para tu equipo',
        'Automatización de procesos manuales o repetitivos',
        'Integraciones entre sistemas que no se hablan entre sí',
        'Paneles de control y reportes adaptados a tu operativa',
      ],
      cta: t('services.dev.cta'),
      processTitle: t('services.dev.right_title'),
      process: [
        { title: t('services.dev.process1'), desc: t('services.dev.process1_desc') },
        { title: t('services.dev.process2'), desc: t('services.dev.process2_desc') },
        { title: t('services.dev.process3'), desc: t('services.dev.process3_desc') },
      ],
    },
    {
      title: t('services.consulting.title'),
      subtitle: t('services.consulting.subtitle'),
      body: t('services.consulting.body'),
      details: [
        'Identificamos qué procesos se benefician realmente de la IA',
        'Automatización de tareas repetitivas con resultados medibles',
        'Asistentes y herramientas de IA adaptados a tu forma de trabajar',
        'Seguimiento y ajuste después de cada implementación',
      ],
      cta: t('services.consulting.cta'),
      processTitle: t('services.consulting.right_title'),
      process: [
        { title: t('services.consulting.metric1') },
        { title: t('services.consulting.metric2') },
        { title: t('services.consulting.metric3') },
      ],
    },
  ]

  return (
    <main>
      <section className="py-20 bg-white border-b border-black/10"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h1 className="text-5xl font-black text-black">{t('services.section_title')}</h1><p className="mt-4 text-lg text-gray-600 max-w-2xl">{t('cta_banner.subtitle')}</p></div></section>

      <div className="bg-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 sm:gap-10">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 120}>
                <ServiceCard {...service} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

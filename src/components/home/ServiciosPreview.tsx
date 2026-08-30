import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import SplitCard from '../shared/SplitCard'

function CardLeft({
  title,
  subtitle,
  body,
  cta,
}: {
  title: string
  subtitle: string
  body: string
  cta: string
}) {
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-2xl font-black text-black">{title}</h3>
      <p className="mt-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">{subtitle}</p>
      <p className="mt-4 text-gray-700 leading-relaxed">{body}</p>
      <div className="mt-8">
        <Link
          to="/servicios"
          className="inline-flex items-center gap-2 border border-black text-black text-sm font-semibold px-5 py-2.5 hover:bg-black hover:text-white transition-colors"
        >
          {cta} →
        </Link>
      </div>
    </div>
  )
}

export default function ServiciosPreview() {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-black mb-12">{t('services.section_title')}</h2>
        <div className="flex flex-col gap-px">
          {/* Desarrollo a Medida */}
          <SplitCard
            left={
              <CardLeft
                title={t('services.dev.title')}
                subtitle={t('services.dev.subtitle')}
                body={t('services.dev.body')}
                cta={t('services.dev.cta')}
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
                cta={t('services.consulting.cta')}
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
        </div>
      </div>
    </section>
  )
}

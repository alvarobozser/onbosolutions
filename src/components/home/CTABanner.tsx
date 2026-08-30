import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { CONTACT_EMAIL } from '../../config/constants'

const PILLS = ['pill1', 'pill2', 'pill3'] as const

export default function CTABanner() {
  const { t } = useTranslation()

  return (
    <section className="bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block border border-white/30 text-xs uppercase tracking-widest px-3 py-1.5 mb-8">
          {t('cta_banner.badge')}
        </span>
        <h2 className="text-4xl sm:text-5xl font-black leading-tight">
          {t('cta_banner.title_line1')}<br />
          {t('cta_banner.title_line2')}
        </h2>
        <p className="mt-6 text-gray-400 max-w-xl mx-auto">
          {t('cta_banner.subtitle')}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {PILLS.map((key) => (
            <span key={key} className="border border-white/20 text-xs uppercase tracking-wide px-3 py-1.5 flex items-center gap-1.5">
              <span>✓</span> {t(`cta_banner.${key}`)}
            </span>
          ))}
        </div>
        <div className="mt-10">
          <Link
            to="/contacto"
            className="inline-block bg-white text-black font-semibold px-8 py-4 text-sm hover:bg-gray-100 transition-colors"
          >
            {t('cta_banner.cta')} →
          </Link>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          {t('cta_banner.email_label')}{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-white hover:underline">
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </section>
  )
}

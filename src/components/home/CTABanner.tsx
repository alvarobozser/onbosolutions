import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { CONTACT_EMAIL } from '../../config/constants'

const PILLS = ['pill1', 'pill2', 'pill3'] as const

export default function CTABanner() {
  const { t } = useTranslation()

  return (
    <section className="relative bg-black text-white py-16 sm:py-24 overflow-hidden noise-subtle">
      {/* Capa geométrica sutil: grid técnico y diamantes rotando muy despacio */}
      <div
        aria-hidden="true"
        className="absolute inset-0 tech-grid-dark opacity-60 pointer-events-none"
      />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <span
          className="hero-diamond-slow absolute border border-white/8"
          style={{
            top: '-8%',
            right: '-6%',
            width: '280px',
            height: '280px',
            transform: 'rotate(45deg)',
          }}
        />
        <span
          className="hero-diamond-reverse absolute border border-white/5 hidden md:block"
          style={{
            bottom: '-12%',
            left: '-4%',
            width: '180px',
            height: '180px',
            transform: 'rotate(45deg)',
          }}
        />
        <span
          className="float-y absolute hidden rounded-full lg:block"
          style={{
            top: '24%',
            left: '14%',
            width: '10px',
            height: '10px',
            backgroundColor: 'var(--accent)',
            transform: 'rotate(45deg)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          className="inline-flex items-center gap-2 border text-xs uppercase tracking-widest px-3 py-1.5 mb-6 sm:mb-8 focus-accent"
          style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-1.5 h-1.5 pulse-dot"
            style={{ backgroundColor: 'var(--accent)' }}
          />
          {t('cta_banner.badge')}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight max-w-3xl mx-auto">
          {t('cta_banner.title_line1')}<br />
          {t('cta_banner.title_line2')}
        </h2>
        <p className="mt-6 text-gray-400 max-w-xl mx-auto">
          {t('cta_banner.subtitle')}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {PILLS.map((key, i) => (
            <span
              key={key}
              className="border border-white/20 text-xs uppercase tracking-wide px-3 py-1.5 flex items-center gap-1.5"
            >
              <span
                aria-hidden="true"
                className="inline-block w-1 h-1 pulse-dot"
                style={{ backgroundColor: 'var(--accent)', animationDelay: `${i * 0.4}s` }}
              />
              {t(`cta_banner.${key}`)}
            </span>
          ))}
        </div>
        <div className="mt-10">
          <Link
            to="/contacto"
            className="btn-accent inline-flex items-center gap-2 font-semibold px-8 py-4 text-sm focus-accent transition-colors"
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

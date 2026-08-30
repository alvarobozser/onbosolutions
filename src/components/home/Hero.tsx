import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative bg-white min-h-[85vh] flex items-center overflow-hidden">
      {/* Logo mark decorativo — derecha */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none select-none"
        aria-hidden="true"
      >
        <div style={{ animation: 'spin-slow 24s linear infinite' }}>
          <svg
            viewBox="0 0 20 16"
            fill="none"
            className="w-[420px] h-[336px] lg:w-[520px] lg:h-[416px]"
          >
            <path
              d="M0 0h12l8 8-8 8H0l8-8L0 0z"
              stroke="black"
              strokeWidth="0.3"
              strokeOpacity="0.12"
              fill="black"
              fillOpacity="0.04"
            />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-3xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-black leading-tight tracking-tight">
            {t('hero.title_line1')}<br />
            {t('hero.title_line2')}
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-xl leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/servicios"
              className="bg-black text-white font-semibold px-6 py-3 text-sm hover:bg-gray-900 transition-colors flex items-center gap-2"
            >
              {t('hero.cta_primary')} →
            </Link>
            <Link
              to="/contacto"
              className="border border-black text-black font-semibold px-6 py-3 text-sm hover:bg-black hover:text-white transition-colors"
            >
              {t('hero.cta_secondary')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

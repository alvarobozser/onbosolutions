import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function GeometricShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Prisma grande top-right */}
      <svg className="absolute top-8 right-8 opacity-10" width="220" height="220" viewBox="0 0 220 220" fill="none">
        <polygon points="110,10 210,190 10,190" fill="black" />
      </svg>
      {/* Cubo flotando */}
      <svg className="absolute top-24 right-48 opacity-8" width="80" height="80" viewBox="0 0 80 80" fill="none">
        <rect x="10" y="10" width="60" height="60" fill="black" transform="rotate(15 40 40)" />
      </svg>
      {/* Rombo bottom-left */}
      <svg className="absolute bottom-16 left-12 opacity-6" width="120" height="120" viewBox="0 0 120 120" fill="none">
        <polygon points="60,5 115,60 60,115 5,60" fill="black" />
      </svg>
      {/* Bloque pequeño */}
      <svg className="absolute top-1/3 left-1/4 opacity-5" width="50" height="50" viewBox="0 0 50 50" fill="none">
        <rect width="50" height="50" fill="black" transform="rotate(30 25 25)" />
      </svg>
    </div>
  )
}

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative bg-white min-h-[85vh] flex items-center overflow-hidden">
      <GeometricShapes />
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

        {/* Logo decorativo bottom-right */}
        <div className="absolute bottom-12 right-8 lg:right-16 hidden lg:block">
          <span className="text-8xl font-black text-black/5 tracking-tighter select-none">ONBO</span>
        </div>
      </div>
    </section>
  )
}

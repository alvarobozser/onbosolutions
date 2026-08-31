import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { CONTACT_EMAIL } from '../../config/constants'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 text-xl font-black tracking-tight text-white uppercase mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              <svg viewBox="0 0 20 16" fill="currentColor" className="w-5 h-4 shrink-0" aria-hidden="true">
                <path d="M0 0h12l8 8-8 8H0l8-8L0 0z" />
              </svg>
              ONBO
            </Link>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed mt-2">{t('footer.tagline')}</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-6 inline-block text-sm text-gray-400 hover:text-white transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5" style={{ fontFamily: 'var(--font-display)' }}>
              {t('nav.services')}
            </h4>
            <nav className="flex flex-col gap-3 text-sm text-gray-400">
              <Link to="/servicios" className="hover:text-white transition-colors">{t('services.dev.title')}</Link>
              <Link to="/servicios" className="hover:text-white transition-colors">{t('services.consulting.title')}</Link>
            </nav>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5" style={{ fontFamily: 'var(--font-display)' }}>
              Empresa
            </h4>
            <nav className="flex flex-col gap-3 text-sm text-gray-400">
              <Link to="/identidad" className="hover:text-white transition-colors">{t('nav.identity')}</Link>
              <Link to="/contacto" className="hover:text-white transition-colors">{t('nav.contact')}</Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs text-gray-600">
          <span>© {year} ONBO Solutions. {t('footer.rights')}</span>
          <Link to="/privacidad" className="hover:text-gray-400 transition-colors">
            {t('contact.privacy')}
          </Link>
        </div>
      </div>
    </footer>
  )
}

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { CONTACT_EMAIL } from '../../config/constants'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <span className="text-xl font-black tracking-tight text-black uppercase">ONBO</span>
            <p className="mt-2 text-sm text-gray-500 max-w-xs">{t('footer.tagline')}</p>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm text-gray-600">
            <Link to="/" className="hover:text-black transition-colors">{t('nav.home')}</Link>
            <Link to="/servicios" className="hover:text-black transition-colors">{t('nav.services')}</Link>
            <Link to="/guias" className="hover:text-black transition-colors">{t('nav.guides')}</Link>
            <Link to="/identidad" className="hover:text-black transition-colors">{t('nav.identity')}</Link>
            <Link to="/contacto" className="hover:text-black transition-colors">{t('nav.contact')}</Link>
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t border-black/10 flex flex-col sm:flex-row justify-between gap-2 text-xs text-gray-400">
          <span>© {year} ONBO Solutions. {t('footer.rights')}</span>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-black transition-colors">{CONTACT_EMAIL}</a>
        </div>
      </div>
    </footer>
  )
}

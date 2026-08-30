import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', labelKey: 'nav.home' },
  { to: '/identidad', labelKey: 'nav.identity' },
] as const

export default function Header() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-black tracking-tight text-black uppercase" style={{ fontFamily: 'var(--font-display)' }}>
            <svg viewBox="0 0 20 16" fill="currentColor" className="w-5 h-4 shrink-0" aria-hidden="true">
              <path d="M0 0h12l8 8-8 8H0l8-8L0 0z" />
            </svg>
            ONBO
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {NAV_LINKS.map(({ to, labelKey }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive ? 'text-black font-semibold' : 'text-gray-600 hover:text-black transition-colors'
                }
              >
                {t(labelKey)}
              </NavLink>
            ))}

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <NavLink
                to="/servicios"
                className={({ isActive }) =>
                  `flex items-center gap-1 ${isActive ? 'text-black font-semibold' : 'text-gray-600 hover:text-black transition-colors'}`
                }
              >
                {t('nav.services')}
                <span className="text-xs">▾</span>
              </NavLink>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-black/10 shadow-lg">
                  <Link to="/servicios" className="block px-4 py-3 text-sm hover:bg-gray-50 border-b border-black/5" onClick={() => setServicesOpen(false)}>
                    {t('services.dev.title')}
                  </Link>
                  <Link to="/servicios" className="block px-4 py-3 text-sm hover:bg-gray-50 border-b border-black/5" onClick={() => setServicesOpen(false)}>
                    {t('services.consulting.title')}
                  </Link>
                  <Link to="/servicios" className="block px-4 py-3 text-sm hover:bg-gray-50" onClick={() => setServicesOpen(false)}>
                    {t('services.innovation.title')}
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center">
            <Link
              to="/contacto"
              className="bg-black text-white text-sm font-semibold px-4 py-2 hover:bg-gray-900 transition-colors flex items-center gap-1"
            >
              {t('nav.cta')} →
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-black/10 bg-white">
          <nav className="flex flex-col px-4 py-4 gap-4 text-sm font-medium">
            {NAV_LINKS.map(({ to, labelKey }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? 'text-black font-semibold' : 'text-gray-600'
                }
              >
                {t(labelKey)}
              </NavLink>
            ))}
            <NavLink
              to="/servicios"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? 'text-black font-semibold' : 'text-gray-600'
              }
            >
              {t('nav.services')}
            </NavLink>
            <div className="pt-2 border-t border-black/10">
              <Link
                to="/contacto"
                onClick={() => setMenuOpen(false)}
                className="bg-black text-white text-sm font-semibold px-4 py-2 inline-block"
              >
                {t('nav.cta')} →
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useActiveSection } from '../../context/ActiveSectionContext'

const NAV_LINKS = [
  { to: '/',          labelKey: 'nav.home',     sectionId: 'inicio'        },
  { to: '/identidad', labelKey: 'nav.identity', sectionId: 'quienes-somos' },
  { to: '/blog',      labelKey: 'nav.blog',     sectionId: 'recursos'      },
] as const

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Header() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const { activeSection } = useActiveSection()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [scrolled, setScrolled] = useState(() => !isHome || (typeof window !== 'undefined' && window.scrollY > 60))

  useEffect(() => {
    if (!isHome) { setScrolled(true); return }
    setScrolled(window.scrollY > 60)
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  function navClass(active: boolean) {
    return active
      ? 'text-black font-semibold'
      : 'text-gray-600 hover:text-black transition-colors'
  }

  function isSectionActive(sectionId: string) {
    if (sectionId === 'inicio') return !activeSection || activeSection === 'home'
    return activeSection === sectionId
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/10 transition-transform duration-300 ease-out ${
      scrolled ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/"
            onClick={() => isHome && scrollTo('inicio')}
            className="flex items-center gap-2 text-xl font-black tracking-tight text-black uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <svg viewBox="0 0 20 16" fill="currentColor" className="w-5 h-4 shrink-0" aria-hidden="true">
              <path d="M0 0h12l8 8-8 8H0l8-8L0 0z" />
            </svg>
            ONBO
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {NAV_LINKS.map(({ to, labelKey, sectionId }) =>
              isHome ? (
                <button
                  key={to}
                  onClick={() => scrollTo(sectionId)}
                  className={navClass(isSectionActive(sectionId))}
                >
                  {t(labelKey)}
                </button>
              ) : (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) => navClass(isActive)}
                >
                  {t(labelKey)}
                </NavLink>
              )
            )}

            {/* Servicios */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              {isHome ? (
                <button
                  onClick={() => scrollTo('servicios')}
                  className={`flex items-center gap-1 ${navClass(isSectionActive('servicios'))}`}
                >
                  {t('nav.services')} <span className="text-xs">▾</span>
                </button>
              ) : (
                <NavLink
                  to="/servicios"
                  className={({ isActive }) =>
                    `flex items-center gap-1 ${navClass(isActive)}`
                  }
                >
                  {t('nav.services')} <span className="text-xs">▾</span>
                </NavLink>
              )}
              {servicesOpen && (
                <div className="absolute top-full left-0 w-56 bg-white border border-black/10 shadow-lg">
                  <Link
                    to="/servicios"
                    className="block px-4 py-3 text-sm hover:bg-gray-50 border-b border-black/5"
                    onClick={() => setServicesOpen(false)}
                  >
                    {t('services.dev.title')}
                  </Link>
                  <Link
                    to="/servicios"
                    className="block px-4 py-3 text-sm hover:bg-gray-50"
                    onClick={() => setServicesOpen(false)}
                  >
                    {t('services.consulting.title')}
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* CTA */}
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

      {/* Mobile menu — overlay, no empuja el contenido */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-black/10 shadow-xl z-50">
          <nav className="flex flex-col px-4 py-4 gap-4 text-sm font-medium">
            {NAV_LINKS.map(({ to, labelKey, sectionId }) =>
              isHome ? (
                <button
                  key={to}
                  onClick={() => { scrollTo(sectionId); setMenuOpen(false) }}
                  className={`w-full text-left ${navClass(isSectionActive(sectionId))}`}
                >
                  {t(labelKey)}
                </button>
              ) : (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) => navClass(isActive)}
                >
                  {t(labelKey)}
                </NavLink>
              )
            )}
            {isHome ? (
              <button
                onClick={() => { scrollTo('servicios'); setMenuOpen(false) }}
                className={`w-full text-left ${navClass(isSectionActive('servicios'))}`}
              >
                {t('nav.services')}
              </button>
            ) : (
              <NavLink
                to="/servicios"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => navClass(isActive)}
              >
                {t('nav.services')}
              </NavLink>
            )}
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

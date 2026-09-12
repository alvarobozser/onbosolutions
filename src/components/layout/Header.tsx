import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useActiveSection } from '../../context/useActiveSection'
import { trackEvent } from '../../analytics/analytics'

const NAV_LINKS = [
  { labelKey: 'nav.home', sectionId: 'inicio' },
  { labelKey: 'nav.services', sectionId: 'servicios' },
  { labelKey: 'nav.identity', sectionId: 'quienes-somos' },
  { labelKey: 'nav.blog', sectionId: 'recursos' },
] as const

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Header() {
  const { t } = useTranslation()
  const { activeSection } = useActiveSection()
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => !isHome || (typeof window !== 'undefined' && window.scrollY > 60))

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  function goToSection(sectionId: string) {
    setMenuOpen(false)
    if (isHome) {
      scrollToSection(sectionId)
      return
    }
    navigate('/', { state: { scrollTo: sectionId } })
  }

  function navClass(sectionId: string) {
    const isActive = isHome && (sectionId === 'inicio' ? !activeSection || activeSection === 'home' : activeSection === sectionId)
    return isActive
      ? 'text-black font-semibold'
      : 'text-gray-600 hover:text-black transition-colors'
  }

  const isHeaderVisible = !isHome || scrolled

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/10 transition-transform duration-300 ease-out ${
      isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" onClick={() => isHome && goToSection('inicio')} aria-label="ONBO Solutions" className="text-black">
            <span className="flex items-center gap-2 text-xl font-black tracking-tight text-black uppercase" style={{ fontFamily: 'var(--font-display)' }}>
              <svg viewBox="0 0 20 16" fill="currentColor" className="w-5 h-4 shrink-0" aria-hidden="true"><path d="M0 0h12l8 8-8 8H0l8-8L0 0z" /></svg>
              ONBO
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {NAV_LINKS.map(({ labelKey, sectionId }) => (
              <button
                key={sectionId}
                type="button"
                onClick={() => goToSection(sectionId)}
                className={`${navClass(sectionId)} focus-visible:outline-2 focus-visible:outline-offset-4`}
              >
                {t(labelKey)}
              </button>
            ))}

          </nav>

          <div className="hidden md:flex items-center">
            <Link to="/contacto" onClick={() => trackEvent('cta_header')} className="bg-black text-white text-sm font-semibold px-4 py-2 hover:bg-gray-900 transition-colors flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-2">
              {t('nav.cta')} →
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? t('nav.close_menu') : t('nav.open_menu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden p-2 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-black/10 shadow-xl">
          <nav className="flex flex-col px-4 py-4 gap-4 text-sm font-medium">
            {NAV_LINKS.map(({ labelKey, sectionId }) => (
              <button key={sectionId} type="button" onClick={() => goToSection(sectionId)} className={`w-full text-left ${navClass(sectionId)} focus-visible:outline-2 focus-visible:outline-offset-4`}>
                {t(labelKey)}
              </button>
            ))}
            <div className="pt-2 border-t border-black/10">
              <Link to="/contacto" onClick={() => { trackEvent('cta_header'); setMenuOpen(false) }} className="bg-black text-white text-sm font-semibold px-4 py-2 inline-block focus-visible:outline-2 focus-visible:outline-offset-2">
                {t('nav.cta')} →
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

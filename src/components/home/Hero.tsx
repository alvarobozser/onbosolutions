import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { trackEvent } from '../../analytics/analytics'

function scrollToServices() {
  document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const { t } = useTranslation()
  const shapeRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const animationRunningRef = useRef(false)
  const reducedMotionRef = useRef(false)
  const [style, setStyle] = useState<React.CSSProperties>({})
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotionRef.current = mediaQuery.matches
    const onPreferenceChange = () => {
      reducedMotionRef.current = mediaQuery.matches
      if (mediaQuery.matches) {
        cancelAnimationFrame(rafRef.current)
        animationRunningRef.current = false
        setStyle({})
      }
    }
    mediaQuery.addEventListener('change', onPreferenceChange)
    return () => {
      mediaQuery.removeEventListener('change', onPreferenceChange)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  function startTiltAnimation() {
    if (reducedMotionRef.current || animationRunningRef.current) return
    animationRunningRef.current = true
    const tick = () => {
      const lerpFactor = 0.07
      tiltRef.current.x += (targetRef.current.x - tiltRef.current.x) * lerpFactor
      tiltRef.current.y += (targetRef.current.y - tiltRef.current.y) * lerpFactor
      const { x, y } = tiltRef.current
      setStyle({
        transform: `perspective(500px) rotateX(${(-y * 30).toFixed(1)}deg) rotateY(${(x * 30).toFixed(1)}deg)`,
        filter: `drop-shadow(${(x * 16).toFixed(1)}px ${(y * 16).toFixed(1)}px 18px rgba(0,0,0,0.35))`,
        willChange: 'transform, filter',
        transformOrigin: '50% 50%',
      })
      if (Math.abs(targetRef.current.x - x) < 0.001 && Math.abs(targetRef.current.y - y) < 0.001) {
        animationRunningRef.current = false
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!shapeRef.current) return
    const rect = shapeRef.current.getBoundingClientRect()
    targetRef.current = {
      x: Math.max(-1, Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (rect.width * 0.8))),
      y: Math.max(-1, Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / (rect.height * 0.8))),
    }
    startTiltAnimation()
  }

  const handleMouseLeave = () => {
    targetRef.current = { x: 0, y: 0 }
  }

  return (
    <section id="inicio" className="relative bg-white min-h-screen flex items-center overflow-hidden pb-16">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div>
            <h1 className="hero-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black leading-tight tracking-tight">
              {t('hero.title_line1')}<br />
              {t('hero.title_line2')}
            </h1>
            <p className="hero-line mt-6 text-lg text-gray-500 max-w-xl leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="hero-line mt-8 flex flex-wrap gap-4">
              <button type="button" onClick={() => { trackEvent('cta_hero'); scrollToServices() }} className="bg-black text-white font-semibold px-6 py-3 text-sm hover:bg-gray-900 transition-colors flex items-center gap-2">
                {t('hero.cta_primary')} →
              </button>
              <Link to="/contacto" className="border border-black text-black font-semibold px-6 py-3 text-sm hover:bg-black hover:text-white transition-colors">
                {t('hero.cta_secondary')}
              </Link>
            </div>
          </div>

          <div
            ref={shapeRef}
            className="hidden lg:flex items-center justify-center cursor-crosshair"
            aria-hidden="true"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <svg viewBox="0 0 20 16" fill="black" className="w-[200px] h-[160px] select-none" style={style}>
              <path d="M0 0h12l8 8-8 8H0l8-8L0 0z" />
            </svg>
          </div>

        </div>
      </div>

      <button
        onClick={scrollToServices}
        aria-label="Ver servicios"
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-opacity duration-500 ${
          scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">Scroll</span>
        <svg viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-5 text-black scroll-arrow">
          <path d="M6 0 v14 M1 9 l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  )
}

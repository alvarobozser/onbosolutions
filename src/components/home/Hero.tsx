import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

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
      const rx = (-y * 30).toFixed(1)
      const ry = (x * 30).toFixed(1)
      const shadowX = (x * 16).toFixed(1)
      const shadowY = (y * 16).toFixed(1)

      setStyle({
        transform: `perspective(500px) rotateX(${rx}deg) rotateY(${ry}deg)`,
        filter: `drop-shadow(${shadowX}px ${shadowY}px 18px rgba(0,0,0,0.35))`,
        willChange: 'transform, filter',
        transformOrigin: '50% 50%',
      })

      const settled = Math.abs(targetRef.current.x - x) < 0.001 && Math.abs(targetRef.current.y - y) < 0.001
      if (settled) {
        animationRunningRef.current = false
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!shapeRef.current) return
    const r = shapeRef.current.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    targetRef.current = {
      x: Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width * 0.8))),
      y: Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height * 0.8))),
    }
    startTiltAnimation()
  }

  const handleMouseLeave = () => {
    targetRef.current = { x: 0, y: 0 }
  }

  return (
    <section id="inicio" className="relative surface-warm min-h-screen flex items-center overflow-hidden pb-16">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div>
            <p className="hero-line text-xs sm:text-sm uppercase tracking-widest text-black/80 font-semibold mb-5 flex items-center">
              <span className="accent-mark" aria-hidden="true" />
              ONBO · Software + IA
            </p>
            <h1 className="hero-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black leading-tight tracking-tight">
              {t('hero.title_line1')}<br />
              {t('hero.title_line2')}
            </h1>
            <p className="hero-line mt-6 text-lg text-gray-500 max-w-xl leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="hero-line mt-8 flex flex-wrap gap-4">
              <Link
                to="/servicios"
                className="btn-accent font-semibold px-6 py-3 text-sm flex items-center gap-2 focus-accent transition-colors"
              >
                {t('hero.cta_primary')} →
              </Link>
              <Link
                to="/contacto"
                className="border border-black text-black font-semibold px-6 py-3 text-sm hover:bg-black hover:text-white focus-accent transition-colors"
              >
                {t('hero.cta_secondary')}
              </Link>
            </div>
          </div>

          {/* Logo mark 3D — tilt con el ratón */}
          <div
            ref={shapeRef}
            className="relative hidden lg:flex items-center justify-center cursor-crosshair"
            aria-hidden="true"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Acento geométrico sutil detrás del logo */}
            <span
              aria-hidden="true"
              className="absolute select-none"
              style={{
                width: '180px',
                height: '180px',
                backgroundColor: 'var(--accent)',
                transform: 'rotate(-8deg)',
                opacity: 0.55,
                zIndex: 0,
              }}
            />
            <svg
              viewBox="0 0 20 16"
              fill="black"
              className="w-[200px] h-[160px] select-none relative"
              style={{ ...style, zIndex: 1 }}
            >
              <path d="M0 0h12l8 8-8 8H0l8-8L0 0z" />
            </svg>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToServices}
        aria-label="Ver servicios"
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-opacity duration-500 ${
          scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">Scroll</span>
        <svg
          viewBox="0 0 12 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-3 h-5 text-black scroll-arrow"
        >
          <path d="M6 0 v14 M1 9 l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  )
}

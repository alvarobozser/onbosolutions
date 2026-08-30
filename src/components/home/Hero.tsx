import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function Hero() {
  const { t } = useTranslation()
  const shapeRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const [style, setStyle] = useState<React.CSSProperties>({})

  useEffect(() => {
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

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!shapeRef.current) return
    const r = shapeRef.current.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    targetRef.current = {
      x: Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width * 0.8))),
      y: Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height * 0.8))),
    }
  }

  const handleMouseLeave = () => {
    targetRef.current = { x: 0, y: 0 }
  }

  return (
    <section className="relative bg-white min-h-[85vh] flex items-center overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div>
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

          {/* Logo mark 3D — tilt con el ratón */}
          <div
            ref={shapeRef}
            className="hidden lg:flex items-center justify-center cursor-crosshair"
            aria-hidden="true"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <svg
              viewBox="0 0 20 16"
              fill="black"
              className="w-[200px] h-[160px] select-none"
              style={style}
            >
              <path d="M0 0h12l8 8-8 8H0l8-8L0 0z" />
            </svg>
          </div>

        </div>
      </div>
    </section>
  )
}

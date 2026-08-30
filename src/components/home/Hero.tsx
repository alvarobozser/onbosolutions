import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function Hero() {
  const { t } = useTranslation()
  const shapeRef = useRef<HTMLDivElement>(null)
  const spinRef = useRef(0)
  const tiltRef = useRef({ x: 0, y: 0 })
  const targetTiltRef = useRef({ x: 0, y: 0 })
  const isDraggingRef = useRef(false)
  const rafRef = useRef<number>(0)
  const [transform, setTransform] = useState('')

  useEffect(() => {
    let prev = performance.now()

    const tick = (now: number) => {
      const dt = now - prev
      prev = now

      // Auto-giro en Z siempre activo
      spinRef.current += dt * (360 / 18000)

      // Suavizar tilt — solo si se está arrastrando
      const lerpFactor = isDraggingRef.current ? 0.08 : 0.04
      tiltRef.current.x += (targetTiltRef.current.x - tiltRef.current.x) * lerpFactor
      tiltRef.current.y += (targetTiltRef.current.y - tiltRef.current.y) * lerpFactor

      const { x, y } = tiltRef.current
      setTransform(
        `perspective(600px) rotateX(${(-y * 28).toFixed(2)}deg) rotateY(${(x * 28).toFixed(2)}deg) rotateZ(${spinRef.current.toFixed(2)}deg)`
      )

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const getTilt = (e: React.MouseEvent) => {
    if (!shapeRef.current) return
    const r = shapeRef.current.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    targetTiltRef.current = {
      x: Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width * 1.2))),
      y: Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height * 1.2))),
    }
  }

  return (
    <section className="relative bg-white min-h-[85vh] flex items-center overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Texto */}
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

          {/* Logo mark 3D — interactivo al hacer clic */}
          <div
            className="hidden lg:flex items-center justify-center cursor-grab active:cursor-grabbing"
            aria-hidden="true"
            ref={shapeRef}
            onMouseDown={(e) => { isDraggingRef.current = true; getTilt(e) }}
            onMouseMove={(e) => { if (isDraggingRef.current) getTilt(e) }}
            onMouseUp={() => { isDraggingRef.current = false; targetTiltRef.current = { x: 0, y: 0 } }}
            onMouseLeave={() => { isDraggingRef.current = false; targetTiltRef.current = { x: 0, y: 0 } }}
          >
            <svg
              viewBox="0 0 20 16"
              fill="black"
              className="w-[200px] h-[160px] select-none"
              style={{ transform, willChange: 'transform', transformOrigin: '50% 50%' }}
            >
              <path d="M0 0h12l8 8-8 8H0l8-8L0 0z" />
            </svg>
          </div>

        </div>
      </div>
    </section>
  )
}

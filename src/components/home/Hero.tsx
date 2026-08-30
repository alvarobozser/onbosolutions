import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const PATHS = [
  "M18 16l4-4-4-4",
  "M6 8l-4 4 4 4",
  "M14.5 4l-5 16",
]
const EXTRUDE_STEPS = 5
const TILT_MAX = 32

function Code2Icon3D() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const state = useRef({
    curX: 0, curY: 0,
    targX: 0, targY: 0,
    dragging: false,
    lastMX: 0, lastMY: 0,
    raf: 0,
  })

  useEffect(() => {
    const s = state.current
    const scene = sceneRef.current
    const stage = stageRef.current
    if (!scene || !stage) return

    const onDown = (e: MouseEvent) => {
      s.dragging = true
      s.lastMX = e.clientX
      s.lastMY = e.clientY
      stage.style.cursor = 'grabbing'
    }
    const onMove = (e: MouseEvent) => {
      if (!s.dragging) return
      s.targY += (e.clientX - s.lastMX) * 0.5
      s.targX -= (e.clientY - s.lastMY) * 0.5
      s.targX = Math.max(-TILT_MAX, Math.min(TILT_MAX, s.targX))
      s.targY = Math.max(-TILT_MAX, Math.min(TILT_MAX, s.targY))
      s.lastMX = e.clientX
      s.lastMY = e.clientY
    }
    const onUp = () => {
      s.dragging = false
      s.targX = 0
      s.targY = 0
      stage.style.cursor = 'grab'
    }

    stage.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)

    const tick = () => {
      const L = s.dragging ? 0.18 : 0.06
      s.curX += (s.targX - s.curX) * L
      s.curY += (s.targY - s.curY) * L

      const sx    = (-s.curY * 0.5).toFixed(1)
      const sy    = ( s.curX * 0.5).toFixed(1)
      const depth = (Math.abs(s.curX) + Math.abs(s.curY)) / (TILT_MAX * 2)
      const blur  = (10 + depth * 20).toFixed(1)
      const alpha = (0.12 + depth * 0.22).toFixed(2)

      scene.style.transform =
        `perspective(500px) rotateX(${s.curX.toFixed(2)}deg) rotateY(${s.curY.toFixed(2)}deg)`
      scene.style.filter =
        `drop-shadow(${sx}px ${sy}px ${blur}px rgba(0,0,0,${alpha}))`

      s.raf = requestAnimationFrame(tick)
    }
    s.raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(s.raf)
      stage.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  // Build extrusion layers
  const layers = []

  for (let i = 0; i < EXTRUDE_STEPS; i++) {
    const t   = i / (EXTRUDE_STEPS - 1)
    const off = (6 * (1 - t) * 0.6).toFixed(1)
    const lum = Math.round(30 + t * 20)
    layers.push(
      <svg
        key={`body-${i}`}
        viewBox="-2 -2 28 28"
        fill="none"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          transform: `translate(${off}px, ${off}px) translateZ(${(i - EXTRUDE_STEPS) * 1.5}px)`,
        }}
      >
        {PATHS.map((d, j) => (
          <path key={j} d={d} stroke={`rgb(${lum},${lum},${lum})`}
            strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
        ))}
      </svg>
    )
  }

  // Front face
  layers.push(
    <svg
      key="front"
      viewBox="-2 -2 28 28"
      fill="none"
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        transform: 'translateZ(1px)',
      }}
    >
      {PATHS.map((d, j) => (
        <path key={j} d={d} stroke="black"
          strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  )

  return (
    <div
      ref={stageRef}
      className="hidden lg:flex items-center justify-center"
      aria-hidden="true"
      style={{ cursor: 'grab', userSelect: 'none' }}
    >
      <div
        ref={sceneRef}
        style={{
          position: 'relative',
          width: 160,
          height: 160,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {layers}
      </div>
    </div>
  )
}

export default function Hero() {
  const { t } = useTranslation()

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

          <Code2Icon3D />

        </div>
      </div>
    </section>
  )
}

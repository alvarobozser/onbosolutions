import { useLocation } from 'react-router-dom'
import { useActiveSection } from '../../context/ActiveSectionContext'

const DOTS = [
  { id: 'inicio',        label: 'Inicio',        section: 'home'          },
  { id: 'servicios',     label: 'Servicios',     section: 'servicios'     },
  { id: 'quienes-somos', label: 'Quiénes somos', section: 'quienes-somos' },
  { id: 'recursos',      label: 'Recursos',      section: 'recursos'      },
] as const

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function SectionDots() {
  const { activeSection } = useActiveSection()
  const location = useLocation()

  if (location.pathname !== '/') return null

  return (
    <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4 hidden sm:flex">
      {DOTS.map(({ id, label, section }) => {
        const isActive = section === 'home'
          ? !activeSection || activeSection === 'home'
          : activeSection === section

        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={label}
            className="group relative flex items-center justify-end gap-2"
          >
            {/* Tooltip */}
            <span className="absolute right-5 text-xs font-semibold bg-black text-white px-2.5 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200 pointer-events-none select-none">
              {label}
            </span>
            {/* Dot */}
            <span
              className={`block rounded-full border-2 border-black transition-all duration-300 ${
                isActive
                  ? 'w-3 h-3 bg-black'
                  : 'w-2 h-2 bg-white group-hover:bg-black/20'
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}

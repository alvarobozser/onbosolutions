import { useEffect } from 'react'
import { useMeta } from '../hooks/useMeta'
import CTABanner from '../components/home/CTABanner'
import Hero from '../components/home/Hero'
import ServiciosSection from '../components/home/ServiciosSection'
import IdentidadSection from '../components/home/IdentidadSection'
import BlogSection from '../components/home/BlogSection'
import { useActiveSection } from '../context/useActiveSection'

function ChevronBreak() {
  return (
    <div
      className="flex justify-center items-center py-3 bg-white border-y border-black/5"
      aria-hidden="true"
    >
      <svg viewBox="0 0 20 16" fill="currentColor" className="w-5 h-4 text-black opacity-[0.08]">
        <path d="M0 0h12l8 8-8 8H0l8-8L0 0z" />
      </svg>
    </div>
  )
}

const SECTIONS = [
  { id: 'inicio',        section: 'home'          },
  { id: 'servicios',     section: 'servicios'     },
  { id: 'quienes-somos', section: 'quienes-somos' },
  { id: 'recursos',      section: 'recursos'      },
] as const

export default function Home() {
  useMeta({
    title: 'ONBO Solutions',
    description: 'Software a medida e IA integrada para empresas. Trato directo, sin agencias de por medio. Primera consulta sin coste.',
  })
  const { setActiveSection } = useActiveSection()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const match = SECTIONS.find(s => s.id === entry.target.id)
            if (match) setActiveSection(match.section)
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      observer.disconnect()
      setActiveSection(null)
    }
  }, [setActiveSection])

  return (
    <main>
      <Hero />
      <ChevronBreak />
      <ServiciosSection />
      <ChevronBreak />
      <IdentidadSection />
      <ChevronBreak />
      <BlogSection />
      <CTABanner />
    </main>
  )
}

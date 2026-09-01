import { useEffect } from 'react'
import CTABanner from '../components/home/CTABanner'
import Hero from '../components/home/Hero'
import ServiciosSection from '../components/home/ServiciosSection'
import IdentidadSection from '../components/home/IdentidadSection'
import BlogSection from '../components/home/BlogSection'
import { useActiveSection } from '../context/ActiveSectionContext'

const SECTIONS = [
  { id: 'inicio',        section: 'home'          },
  { id: 'servicios',     section: 'servicios'     },
  { id: 'quienes-somos', section: 'quienes-somos' },
  { id: 'recursos',      section: 'recursos'      },
] as const

export default function Home() {
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
      <ServiciosSection />
      <IdentidadSection />
      <BlogSection />
      <CTABanner />
    </main>
  )
}

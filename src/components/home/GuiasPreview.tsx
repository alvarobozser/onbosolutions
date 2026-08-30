import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface GuiaCardProps {
  category: string
  title: string
  date: string
  pattern: 'chevrons' | 'dots' | 'diagonals' | 'triangles' | 'grid' | 'circles'
}

const PATTERNS: Record<GuiaCardProps['pattern'], string> = {
  chevrons: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 L20 0 L40 20 M0 40 L20 20 L40 40' fill='none' stroke='%23000' stroke-width='1' opacity='0.08'/%3E%3C/svg%3E")`,
  dots: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1.5' fill='%23000' opacity='0.1'/%3E%3C/svg%3E")`,
  diagonals: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 L20 0' stroke='%23000' stroke-width='1' opacity='0.08'/%3E%3C/svg%3E")`,
  triangles: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='20,5 35,35 5,35' fill='none' stroke='%23000' stroke-width='1' opacity='0.08'/%3E%3C/svg%3E")`,
  grid: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L0 0 0 20' fill='none' stroke='%23000' stroke-width='0.5' opacity='0.1'/%3E%3C/svg%3E")`,
  circles: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='15' fill='none' stroke='%23000' stroke-width='1' opacity='0.08'/%3E%3C/svg%3E")`,
}

const PREVIEW_GUIDES: GuiaCardProps[] = [
  { category: 'ia', title: 'Cómo implementar RAG en producción sin morir en el intento', date: '2026-08-01', pattern: 'chevrons' },
  { category: 'backend', title: 'Arquitectura hexagonal en Spring Boot: guía práctica', date: '2026-07-15', pattern: 'dots' },
  { category: 'arquitectura', title: 'DDD aplicado: del dominio al código en 5 pasos', date: '2026-07-01', pattern: 'diagonals' },
  { category: 'financiacion', title: 'Cómo acceder a las ayudas Next Generation para tu startup', date: '2026-06-20', pattern: 'triangles' },
  { category: 'ia', title: 'Evaluación de modelos LLM en producción: métricas reales', date: '2026-06-05', pattern: 'grid' },
]

function GuiaCard({ category, title, date, pattern }: GuiaCardProps) {
  const { t } = useTranslation()
  const formattedDate = new Date(date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <Link
      to="/guias"
      className="group border border-black/10 flex flex-col hover:border-black transition-colors overflow-hidden"
    >
      <div
        className="h-36 bg-gray-50 relative"
        style={{ backgroundImage: PATTERNS[pattern] }}
      >
        <span className="absolute top-3 left-3 bg-black text-white text-xs uppercase tracking-widest px-2 py-1">
          {t(`guides.categories.${category}`)}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-black leading-snug flex-1 group-hover:underline">
          {title}
        </h3>
        <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
          <span>{formattedDate}</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}

export default function GuiasPreview() {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-black mb-12">{t('guides.section_title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10">
          {PREVIEW_GUIDES.map((guide) => (
            <div key={guide.title} className="bg-white">
              <GuiaCard {...guide} />
            </div>
          ))}
          {/* CTA card */}
          <div className="bg-black flex items-center justify-center p-8">
            <Link
              to="/guias"
              className="text-center text-white group"
            >
              <p className="text-4xl font-black">10+</p>
              <p className="mt-2 text-sm text-gray-400 group-hover:text-white transition-colors">
                {t('guides.see_all')} →
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

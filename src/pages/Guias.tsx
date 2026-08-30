import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type Category, CATEGORIES, type Guia, GUIAS } from '../data/guias'

const PATTERNS: Record<Guia['pattern'], string> = {
  chevrons: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 L20 0 L40 20 M0 40 L20 20 L40 40' fill='none' stroke='%23000' stroke-width='1' opacity='0.08'/%3E%3C/svg%3E")`,
  dots: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1.5' fill='%23000' opacity='0.1'/%3E%3C/svg%3E")`,
  diagonals: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 L20 0' stroke='%23000' stroke-width='1' opacity='0.08'/%3E%3C/svg%3E")`,
  triangles: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='20,5 35,35 5,35' fill='none' stroke='%23000' stroke-width='1' opacity='0.08'/%3E%3C/svg%3E")`,
  grid: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L0 0 0 20' fill='none' stroke='%23000' stroke-width='0.5' opacity='0.1'/%3E%3C/svg%3E")`,
  circles: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='15' fill='none' stroke='%23000' stroke-width='1' opacity='0.08'/%3E%3C/svg%3E")`,
}

function GuiaCard({ guia, lang }: { guia: Guia; lang: string }) {
  const { t } = useTranslation()
  const title = lang.startsWith('en') ? guia.titleEn : guia.titleEs
  const formattedDate = new Date(guia.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <article className="group border border-black/10 flex flex-col hover:border-black transition-colors overflow-hidden">
      <div className="h-40 bg-gray-50 relative" style={{ backgroundImage: PATTERNS[guia.pattern] }}>
        <span className="absolute top-3 left-3 bg-black text-white text-xs uppercase tracking-widest px-2 py-1">
          {t(`guides.categories.${guia.category}`)}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h2 className="text-sm font-semibold text-black leading-snug flex-1 group-hover:underline">
          {title}
        </h2>
        <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
          <span>{formattedDate}</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </article>
  )
}

export default function Guias() {
  const { t, i18n } = useTranslation()
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)

  const filtered = activeCategory
    ? GUIAS.filter((g) => g.category === activeCategory)
    : GUIAS

  return (
    <main className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-black text-black">{t('guides.section_title')}</h1>

        {/* Category filter */}
        <div className="mt-10 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 text-xs uppercase tracking-widest border transition-colors ${
              activeCategory === null
                ? 'bg-black text-white border-black'
                : 'border-black/20 text-gray-600 hover:border-black hover:text-black'
            }`}
          >
            Todos
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-widest border transition-colors ${
                activeCategory === cat
                  ? 'bg-black text-white border-black'
                  : 'border-black/20 text-gray-600 hover:border-black hover:text-black'
              }`}
            >
              {t(`guides.categories.${cat}`)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10">
          {filtered.map((guia) => (
            <div key={guia.slug} className="bg-white">
              <GuiaCard guia={guia} lang={i18n.language} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

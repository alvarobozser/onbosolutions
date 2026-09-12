import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type Category, CATEGORIES, type Guia, GUIAS } from '../data/guias'
import Reveal from '../components/shared/Reveal'
import { useMeta } from '../hooks/useMeta'

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
  const formattedDate = new Date(guia.date).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <article className="h-full">
      <div className="h-full overflow-hidden border border-black/10">
        <div
        className="h-40 bg-gray-50 relative border-b border-black/10"
          style={{ backgroundImage: PATTERNS[guia.pattern] }}
        >
          <span
            className="absolute top-3 left-3 bg-black text-white text-xs uppercase tracking-[0.16em] px-2 py-1"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t(`guides.categories.${guia.category}`)}
          </span>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h2
            className="text-sm sm:text-base font-semibold text-black leading-snug flex-1"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h2>
          <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
            <span>{formattedDate}</span>
            <ArrowRight size={14} className="text-black" />
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Guias() {
  useMeta({
    title: 'Guías',
    description:
      'Guías prácticas de software, automatización e inteligencia artificial para empresas.',
  })
  const { t, i18n } = useTranslation()
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)

  const filtered = activeCategory
    ? GUIAS.filter((g) => g.category === activeCategory)
    : GUIAS

  return (
    <main>
      <section className="py-20 bg-white border-b border-black/10"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h1 className="text-5xl font-black text-black">{t('guides.section_title')}</h1></div></section>

      <section className="bg-white py-5 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              aria-pressed={activeCategory === null}
              className={`chip ${activeCategory === null ? 'is-active' : ''}`}
            >
              Todos
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`chip ${activeCategory === cat ? 'is-active' : ''}`}
              >
                {t(`guides.categories.${cat}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-sm text-gray-500">
              No hay guías en esta categoría.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((guia, i) => (
                <Reveal key={guia.slug} delay={i * 80}>
                  <GuiaCard guia={guia} lang={i18n.language} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

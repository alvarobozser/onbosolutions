import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ARTICLES } from '../../data/articles'
import Reveal from '../shared/Reveal'

const CATEGORIES = ['Todos', ...Array.from(new Set(ARTICLES.map(a => a.category)))]

export default function BlogSection() {
  const [active, setActive] = useState('Todos')

  const filtered = active === 'Todos'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === active)

  return (
    <section id="recursos" className="bg-white">

      {/* Header */}
      <div className="py-8 sm:py-12 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="left">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 flex items-center">
              <span
                aria-hidden="true"
                className="inline-block w-1.5 h-1.5 mr-2"
                style={{ backgroundColor: 'var(--accent)' }}
              />
              Recursos
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-black">Recursos</h2>
            <p className="mt-4 text-gray-500 max-w-xl leading-relaxed">
              Sin humo. Lo que realmente necesitas saber sobre IA y software para tomar mejores decisiones en tu empresa.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white border-b border-black/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Categorías">
            {CATEGORIES.map(cat => {
              const isActive = active === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  aria-pressed={isActive}
                  className={`filter-pill text-xs font-semibold px-3 py-1.5 border focus-accent ${
                    isActive
                      ? 'text-black'
                      : 'bg-white text-gray-600 border-black/20 hover:border-black hover:text-black'
                  }`}
                  style={isActive
                    ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }
                    : undefined}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((article, i) => (
              <Reveal key={article.slug} delay={i * 60} variant="scale">
                <Link
                  to={`/blog/${article.slug}`}
                  className="group relative border-2 border-black p-6 sm:p-8 flex flex-col card-lift bg-white h-full overflow-hidden focus-accent"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-1.5 group-focus-visible:w-1.5 transition-all duration-300 ease-out"
                    style={{ backgroundColor: 'var(--accent)' }}
                  />
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4 sm:mb-5 flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="inline-block w-1 h-1"
                      style={{ backgroundColor: 'var(--accent)' }}
                    />
                    {article.category}
                  </span>
                  <h3 className="text-base font-black text-black leading-snug flex-1">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="mt-5 sm:mt-6 flex items-center gap-3">
                    <span className="editorial-link text-xs font-semibold text-black pb-0.5">
                      Leer artículo
                    </span>
                    <span className="text-xs text-gray-400">{article.readTime}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
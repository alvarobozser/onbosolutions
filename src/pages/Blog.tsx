import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ARTICLES, type Article } from '../data/articles'
import Reveal from '../components/shared/Reveal'
import { useMeta } from '../hooks/useMeta'

const CATEGORIES = ['Todos', ...Array.from(new Set(ARTICLES.map(a => a.category)))]

export default function Blog() {
  useMeta({
    title: 'Recursos',
    description: 'Guías prácticas sobre IA y software para empresas. Sin humo, solo lo que necesitas saber para tomar mejores decisiones.',
  })
  const [active, setActive] = useState('Todos')

  const filtered = active === 'Todos'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === active)

  return (
    <main>
      {/* Hero */}
      <section className="py-20 bg-white border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 flex items-center">
            <span
              aria-hidden="true"
              className="inline-block w-1.5 h-1.5 mr-2"
              style={{ backgroundColor: 'var(--accent)' }}
            />
            Blog
          </p>
          <h1 className="text-5xl font-black text-black">Recursos</h1>
          <p className="mt-4 text-gray-500 max-w-xl text-lg">
            Sin humo. Lo que realmente necesitas saber sobre IA y software para tomar mejores decisiones en tu empresa.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="bg-white border-b border-black/10 py-4 sticky top-16 z-40">
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
      </section>

      {/* Grid de artículos */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article, i) => (
              <Reveal key={article.slug} delay={i * 60}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-black text-xl">¿Tienes un caso concreto?</p>
            <p className="text-gray-400 mt-1 text-sm">Te lo analizamos sin coste y sin compromiso.</p>
          </div>
          <Link
            to="/contacto"
            className="bg-white text-black font-semibold px-6 py-3 text-sm hover:bg-gray-100 focus-accent transition-colors shrink-0"
          >
            Cuéntanos tu situación →
          </Link>
        </div>
      </section>
    </main>
  )
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group relative border-2 border-black p-8 flex flex-col card-lift bg-white h-full overflow-hidden focus-accent"
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-1.5 group-focus-visible:w-1.5 transition-all duration-300 ease-out"
        style={{ backgroundColor: 'var(--accent)' }}
      />
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5 flex items-center gap-2">
        <span
          aria-hidden="true"
          className="inline-block w-1 h-1"
          style={{ backgroundColor: 'var(--accent)' }}
        />
        {article.category}
      </span>
      <h2 className="text-lg font-black text-black leading-snug flex-1">
        {article.title}
      </h2>
      <p className="mt-3 text-sm text-gray-600 leading-relaxed">
        {article.excerpt}
      </p>
      <div className="mt-6 flex items-center gap-3">
        <span className="editorial-link text-xs font-semibold text-black pb-0.5">
          Leer artículo
        </span>
        <span className="text-xs text-gray-400">{article.readTime}</span>
      </div>
    </Link>
  )
}
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ARTICLES, type Article } from '../data/articles'

const CATEGORIES = ['Todos', ...Array.from(new Set(ARTICLES.map(a => a.category)))]

export default function Blog() {
  const [active, setActive] = useState('Todos')

  const filtered = active === 'Todos'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === active)

  return (
    <main>
      {/* Hero */}
      <section className="py-20 bg-white border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Blog</p>
          <h1 className="text-5xl font-black text-black">Recursos</h1>
          <p className="mt-4 text-gray-500 max-w-xl text-lg">
            Sin humo. Lo que realmente necesitas saber sobre IA y software para tomar mejores decisiones en tu empresa.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="bg-white border-b border-black/10 py-4 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`text-xs font-semibold px-3 py-1.5 border transition-colors ${
                  active === cat
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-600 border-black/20 hover:border-black hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de artículos */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10">
            {filtered.map(article => (
              <ArticleCard key={article.slug} article={article} />
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
            className="bg-white text-black font-semibold px-6 py-3 text-sm hover:bg-gray-100 transition-colors shrink-0"
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
    <Link to={`/blog/${article.slug}`} className="bg-white p-8 flex flex-col group">
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">
        {article.category}
      </span>
      <h2 className="text-lg font-black text-black leading-snug group-hover:underline underline-offset-2 decoration-1">
        {article.title}
      </h2>
      <p className="mt-3 text-sm text-gray-600 leading-relaxed flex-1">
        {article.excerpt}
      </p>
      <div className="mt-6 flex items-center gap-3">
        <span className="text-xs font-semibold text-black border-b border-black/30 pb-0.5 group-hover:border-black transition-colors">
          Leer artículo →
        </span>
        <span className="text-xs text-gray-400">{article.readTime}</span>
      </div>
    </Link>
  )
}

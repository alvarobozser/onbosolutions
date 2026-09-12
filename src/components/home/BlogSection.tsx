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

      {/* Cabecera */}
      <div className="py-8 sm:py-12 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="left">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Recursos</p>
            <h2 className="text-3xl sm:text-4xl font-black text-black">
              Recursos
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl leading-relaxed">
              Sin humo. Lo que realmente necesitas saber sobre IA y software para tomar mejores decisiones en tu empresa.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white border-b border-black/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`text-xs font-semibold px-3 py-1.5 border transition-colors ${active === cat ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-black/20 hover:border-black hover:text-black'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((article, i) => (
              <Reveal key={article.slug} delay={i * 60} variant="scale">
                <Link to={`/blog/${article.slug}`} className="border-2 border-black p-6 sm:p-8 flex flex-col group hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 bg-white h-full">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4 sm:mb-5">{article.category}</span>
                  <h3 className="text-base font-black text-black leading-snug group-hover:underline underline-offset-2 decoration-1 flex-1">{article.title}</h3>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{article.excerpt}</p>
                  <div className="mt-5 sm:mt-6 flex items-center gap-3"><span className="text-xs font-semibold text-black border-b border-black/30 pb-0.5 group-hover:border-black transition-colors">Leer artículo →</span><span className="text-xs text-gray-400">{article.readTime}</span></div>
                </Link>
              </Reveal>
            ))}
          </div>

        </div>
      </div>

    </section>
  )
}

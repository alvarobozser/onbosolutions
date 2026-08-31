import { useState } from 'react'
import { Link } from 'react-router-dom'

interface Article {
  slug: string
  category: string
  title: string
  excerpt: string
  readTime: string
  date: string
}

const ARTICLES: Article[] = [
  {
    slug: 'que-es-un-agente-de-ia',
    category: 'Agentes de IA',
    title: '¿Qué es un agente de IA y qué puede hacer por mi negocio?',
    excerpt: 'Los agentes de IA no son robots de ciencia ficción. Son programas que toman decisiones y ejecutan tareas por ti, sin que tengas que estar presente. Te explicamos qué son y cuándo tiene sentido usarlos.',
    readTime: '5 min',
    date: 'Ago 2025',
  },
  {
    slug: 'automatizacion-por-donde-empezar',
    category: 'Automatización',
    title: 'Automatización de procesos: por dónde empezar si tu empresa no es tech',
    excerpt: 'No necesitas un equipo de ingenieros para automatizar. Con los procesos correctos identificados, el impacto llega en semanas. Aquí te contamos cómo priorizar.',
    readTime: '4 min',
    date: 'Ago 2025',
  },
  {
    slug: 'software-a-medida-vs-saas',
    category: 'Software a medida',
    title: 'Software a medida vs. herramientas SaaS: cuándo elegir cada uno',
    excerpt: 'No todo tiene que construirse desde cero. Pero hay casos en los que un SaaS genérico te limita más de lo que te ayuda. Te damos un criterio claro para decidir.',
    readTime: '6 min',
    date: 'Ago 2025',
  },
  {
    slug: 'ia-lista-para-tu-empresa',
    category: 'IA para empresas',
    title: 'Cómo saber si tu empresa está lista para integrar IA',
    excerpt: 'Antes de integrar IA hay preguntas que hacerse: ¿tienes datos ordenados? ¿hay procesos repetitivos claros? ¿el equipo va a usarlo? Un checklist honesto para saberlo.',
    readTime: '5 min',
    date: 'Sep 2025',
  },
  {
    slug: 'procesos-que-puedes-automatizar',
    category: 'Automatización',
    title: '5 procesos que casi cualquier empresa puede automatizar hoy',
    excerpt: 'Desde la gestión de correos hasta los informes semanales. Cinco casos concretos que hemos visto funcionar en empresas medianas, sin grandes inversiones previas.',
    readTime: '4 min',
    date: 'Sep 2025',
  },
  {
    slug: 'lo-que-nadie-cuenta-sobre-ia-en-pymes',
    category: 'IA para empresas',
    title: 'Lo que nadie te cuenta sobre implementar IA en una pyme',
    excerpt: 'La mayoría de los fracasos en proyectos de IA no son técnicos. Son organizativos. Datos sin ordenar, objetivos vagos o falta de seguimiento. Aquí va la verdad sin filtros.',
    readTime: '7 min',
    date: 'Sep 2025',
  },
]

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
          <h1 className="text-5xl font-black text-black">Guías prácticas</h1>
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
    <div className="bg-white p-8 flex flex-col group">
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          {article.category}
        </span>
        <span className="text-xs text-gray-400">{article.date} · {article.readTime}</span>
      </div>
      <h2 className="text-lg font-black text-black leading-snug group-hover:underline underline-offset-2 decoration-1">
        {article.title}
      </h2>
      <p className="mt-3 text-sm text-gray-600 leading-relaxed flex-1">
        {article.excerpt}
      </p>
      <div className="mt-6">
        <span className="text-xs font-semibold text-black border-b border-black/30 pb-0.5 group-hover:border-black transition-colors">
          Leer artículo →
        </span>
      </div>
    </div>
  )
}

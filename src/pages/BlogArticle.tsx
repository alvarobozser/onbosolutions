import { Link, useParams } from 'react-router-dom'
import { ARTICLES } from '../data/articles'
import { useMeta } from '../hooks/useMeta'

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>()
  const article = ARTICLES.find(a => a.slug === slug)

  useMeta({
    title: article ? article.title : 'Artículo no encontrado',
    description: article?.excerpt,
  })

  if (!article) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-5xl font-black text-black mb-4">404</p>
          <p className="text-gray-500 mb-8">Este artículo no existe.</p>
          <Link to="/" className="text-sm font-semibold text-black border-b border-black pb-0.5">
            ← Volver al blog
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-white">

      <section className="pt-14 pb-12 border-b border-black/10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <Link to="/" className="text-xs text-gray-400 hover:text-black transition-colors font-medium">← Recursos</Link>
            <span className="text-gray-200">|</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">{article.category}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-black leading-tight tracking-tight">{article.title}</h1>
          <p className="mt-5 text-lg text-gray-500 leading-relaxed max-w-xl">{article.excerpt}</p>
          <p className="mt-5 text-xs uppercase tracking-widest text-gray-400 font-medium">{article.readTime} de lectura</p>
        </div>
      </section>

      {/* Cuerpo del artículo */}
      <section className="py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 article-body">
          {article.sections.map((section, i) => (
            <div key={i} className={i > 0 ? 'article-section' : ''}>
              {section.heading && (
                <h2 className="article-h2">{section.heading}</h2>
              )}
              {section.paragraphs.map((p, j) => (
                <p key={j} className={j > 0 ? 'article-p' : i === 0 && j === 0 ? 'article-lead' : ''}>
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-black text-xl">¿Aplica esto a tu empresa?</p>
            <p className="text-gray-400 mt-1 text-sm">Cuéntanos tu caso y te respondemos sin rodeos.</p>
          </div>
          <Link to="/contacto" className="bg-white text-black font-semibold px-6 py-3 text-sm hover:bg-gray-100 transition-colors shrink-0">
            Contactar →
          </Link>
        </div>
      </section>

      {/* Más artículos */}
      <section className="py-14 bg-white border-t border-black/10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-6 font-medium">Más guías</p>
          <div className="flex flex-col">
            {ARTICLES.filter(a => a.slug !== slug).slice(0, 3).map(a => (
              <Link
                key={a.slug}
                to={`/blog/${a.slug}`}
                className="group flex items-start justify-between gap-4 py-4 border-b border-black/8 last:border-0"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 block mb-1">
                    {a.category}
                  </span>
                  <span className="text-sm font-semibold text-black group-hover:underline underline-offset-2 decoration-1 leading-snug">
                    {a.title}
                  </span>
                </div>
                <span className="text-xs text-gray-400 shrink-0 pt-5 font-medium">{a.readTime}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}

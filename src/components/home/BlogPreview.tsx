import { Link } from 'react-router-dom'
import { ARTICLES } from '../../data/articles'
import Reveal from '../shared/Reveal'

export default function BlogPreview() {
  const featured = ARTICLES.slice(0, 3)

  return (
    <section id="recursos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal variant="left">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Recursos</p>
              <h2 className="text-3xl font-black text-black">
                Lo que realmente necesitas saber
              </h2>
            </div>
            <Link
              to="/blog"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-black border-b border-black/30 pb-0.5 hover:border-black transition-colors shrink-0 mb-1"
            >
              Ver todos →
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((article, i) => (
            <Reveal key={article.slug} delay={i * 90} variant="scale">
              <Link
                to={`/blog/${article.slug}`}
                className="border-2 border-black p-8 flex flex-col group hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 bg-white h-full"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">
                  {article.category}
                </span>
                <h3 className="text-base font-black text-black leading-snug group-hover:underline underline-offset-2 decoration-1 flex-1">
                  {article.title}
                </h3>
                <div className="mt-6 flex items-center gap-3">
                  <span className="text-xs font-semibold text-black border-b border-black/30 pb-0.5 group-hover:border-black transition-colors">
                    Leer →
                  </span>
                  <span className="text-xs text-gray-400">{article.readTime}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300} variant="up">
          <div className="mt-8 sm:hidden">
            <Link
              to="/blog"
              className="text-sm font-semibold text-black border-b border-black/30 pb-0.5"
            >
              Ver todos los recursos →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { ARTICLES } from '../../data/articles'
import Reveal from '../shared/Reveal'

export default function BlogPreview() {
  const featured = ARTICLES.slice(0, 3)

  return (
    <section id="recursos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal variant="left">
          <div className="flex items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 flex items-center">
                <span
                  aria-hidden="true"
                  className="inline-block w-1.5 h-1.5 mr-2"
                  style={{ backgroundColor: 'var(--accent)' }}
                />
                Recursos
              </p>
              <h2 className="text-3xl font-black text-black">
                Lo que realmente necesitas saber
              </h2>
            </div>
            <Link
              to="/blog"
              className="hidden sm:inline-flex editorial-link text-sm font-semibold text-black shrink-0 mb-1"
            >
              Ver todos
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((article, i) => (
            <Reveal key={article.slug} delay={i * 90} variant="scale">
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
                <h3 className="text-base font-black text-black leading-snug flex-1">
                  {article.title}
                </h3>
                <div className="mt-6 flex items-center gap-3">
                  <span className="editorial-link text-xs font-semibold text-black pb-0.5">
                    Leer
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
              className="editorial-link text-sm font-semibold text-black pb-0.5"
            >
              Ver todos los recursos
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
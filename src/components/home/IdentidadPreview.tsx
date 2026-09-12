import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Reveal from '../shared/Reveal'

export default function IdentidadPreview() {
  const { t } = useTranslation()

  return (
    <section id="quienes-somos" className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal variant="left">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
            {t('nav.identity')}
          </p>
          <h2 className="text-3xl lg:text-4xl font-black leading-tight max-w-2xl">
            {t('identity.section_title')}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Reveal delay={80} variant="left">
            <div className="border-2 border-white/20 p-10 h-full flex flex-col justify-between hover:border-white/50 transition-colors duration-300">
              <blockquote className="text-lg font-black leading-snug text-white">
                {t('identity.quote')}
              </blockquote>
              <cite className="mt-8 block text-sm text-gray-500 not-italic">
                — {t('identity.quote_author')}
              </cite>
            </div>
          </Reveal>

          <Reveal delay={160} variant="right">
            <div className="flex flex-col gap-px bg-white/10 h-full">
              {(
                [
                  { title: t('identity.values.v1_title'), desc: t('identity.values.v1_desc') },
                  { title: t('identity.values.v2_title'), desc: t('identity.values.v2_desc') },
                ] as const
              ).map(({ title, desc }, i) => (
                <div key={i} className="bg-black p-7 flex-1">
                  <p className="font-black text-white text-sm">{title}</p>
                  <p className="mt-1.5 text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={240} variant="up">
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 border border-white/30 text-white text-sm font-semibold px-5 py-2.5 hover:bg-white hover:text-black transition-colors duration-200"
            >
              Conocer al equipo →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

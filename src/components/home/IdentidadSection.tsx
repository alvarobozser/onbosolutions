import { useTranslation } from 'react-i18next'
import Reveal from '../shared/Reveal'

const VALUES = [
  { titleKey: 'identity.values.v1_title', descKey: 'identity.values.v1_desc' },
  { titleKey: 'identity.values.v2_title', descKey: 'identity.values.v2_desc' },
  { titleKey: 'identity.values.v3_title', descKey: 'identity.values.v3_desc' },
  { titleKey: 'identity.values.v4_title', descKey: 'identity.values.v4_desc' },
] as const

export default function IdentidadSection() {
  const { t } = useTranslation()
  const narrativeParagraphs = t('identity.narrative_body').split('\n\n')

  return (
    <section id="quienes-somos" className="bg-white">

      {/* Header */}
      <div className="py-12 sm:py-20 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="left">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
              {t('nav.identity')}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black leading-tight max-w-xl">
              {t('identity.section_title')}
            </h2>
          </Reveal>
        </div>
      </div>

      {/* Narrativa */}
      <div className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <Reveal variant="left">
              <h3 className="text-xl sm:text-2xl font-black text-black">{t('identity.narrative_title')}</h3>
              <div className="mt-6 space-y-4">
                {narrativeParagraphs.map((p, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed">{p}</p>
                ))}
              </div>
            </Reveal>
            <Reveal variant="right" delay={80}>
              <div className="bg-black text-white p-8 sm:p-10">
                <blockquote className="text-lg sm:text-xl font-black leading-snug">
                  {t('identity.quote')}
                </blockquote>
                <cite className="mt-6 block text-sm text-gray-400 not-italic">
                  — {t('identity.quote_author')}
                </cite>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Valores */}
      <div className="bg-black text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="left">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-8 sm:mb-10">Cómo trabajamos</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {VALUES.map(({ titleKey, descKey }, i) => (
              <Reveal key={titleKey} delay={i * 70} variant="up" className="bg-black">
                <div className="p-6 sm:p-8">
                  <span className="text-xs font-mono text-gray-600">0{i + 1}</span>
                  <p className="mt-3 font-black text-white text-base leading-tight">{t(titleKey)}</p>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">{t(descKey)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Equipo */}
      <div className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="up">
            <div className="border-2 border-black p-6 sm:p-8 lg:p-12 max-w-3xl">
              <h3 className="text-2xl sm:text-3xl font-black text-black">{t('identity.team_title')}</h3>
              <div className="mt-4 space-y-4">
                {t('identity.team_intro').split('\n\n').map((p, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

    </section>
  )
}

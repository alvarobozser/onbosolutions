import { useTranslation } from 'react-i18next'

const VALUES = [
  { titleKey: 'identity.values.v1_title', descKey: 'identity.values.v1_desc' },
  { titleKey: 'identity.values.v2_title', descKey: 'identity.values.v2_desc' },
  { titleKey: 'identity.values.v3_title', descKey: 'identity.values.v3_desc' },
  { titleKey: 'identity.values.v4_title', descKey: 'identity.values.v4_desc' },
] as const

export default function Identidad() {
  const { t } = useTranslation()

  const narrativeParagraphs = t('identity.narrative_body').split('\n\n')

  return (
    <main>
      {/* Hero de sección */}
      <section className="py-20 bg-white border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
            {t('nav.identity')}
          </p>
          <h1 className="text-5xl lg:text-6xl font-black text-black leading-tight max-w-xl">
            {t('identity.section_title')}
          </h1>
        </div>
      </section>

      {/* Narrativa */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-2xl font-black text-black">{t('identity.narrative_title')}</h2>
              <div className="mt-6 space-y-4">
                {narrativeParagraphs.map((p, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
            {/* Cita */}
            <div className="bg-black text-white p-10">
              <blockquote className="text-xl font-black leading-snug">
                {t('identity.quote')}
              </blockquote>
              <cite className="mt-6 block text-sm text-gray-400 not-italic">
                — {t('identity.quote_author')}
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-10">
            Cómo trabajamos
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {VALUES.map(({ titleKey, descKey }, i) => (
              <div key={titleKey} className="bg-black p-8">
                <span className="text-xs font-mono text-gray-600">0{i + 1}</span>
                <p className="mt-3 font-black text-white text-base leading-tight">{t(titleKey)}</p>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{t(descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-black/10 p-8 lg:p-12 max-w-3xl">
            <h2 className="text-3xl font-black text-black">{t('identity.team_title')}</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">{t('identity.team_intro')}</p>
          </div>
        </div>
      </section>
    </main>
  )
}

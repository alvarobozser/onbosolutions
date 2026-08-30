import { useTranslation } from 'react-i18next'

const VALUES = [
  'Honestidad ante todo',
  'IA aplicada, no de adorno',
  'Software a tu medida',
  'Resultados desde el primer día',
] as const

const TEAM_MEMBERS = [
  { nameKey: 'identity.team.architect.name', roleKey: 'identity.team.architect.role', bioKey: 'identity.team.architect.bio', initials: 'MO' },
  { nameKey: 'identity.team.ai.name', roleKey: 'identity.team.ai.role', bioKey: 'identity.team.ai.bio', initials: 'AR' },
  { nameKey: 'identity.team.fullstack.name', roleKey: 'identity.team.fullstack.role', bioKey: 'identity.team.fullstack.bio', initials: 'VM' },
] as const

export default function Identidad() {
  const { t } = useTranslation()

  return (
    <main>
      {/* Bloque narrativo */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-black text-black mb-12">{t('identity.section_title')}</h1>
          <div className="border border-black/10 p-8 lg:p-12 max-w-3xl">
            <h2 className="text-2xl font-black text-black">{t('identity.narrative_title')}</h2>
            <p className="mt-6 text-gray-700 leading-relaxed">{t('identity.narrative_body')}</p>
          </div>
        </div>
      </section>

      {/* Cita */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <blockquote className="text-2xl lg:text-3xl font-black leading-tight">
                {t('identity.quote')}
              </blockquote>
              <cite className="mt-6 block text-sm text-gray-400 not-italic">
                — {t('identity.quote_author')}
              </cite>
            </div>
            <div className="lg:w-72 h-48 lg:h-64 relative overflow-hidden shrink-0" aria-hidden="true">
              <svg viewBox="0 0 288 256" className="w-full h-full">
                <defs>
                  <linearGradient id="tunnel" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <rect
                    key={i}
                    x={i * 16} y={i * 14}
                    width={288 - i * 32} height={256 - i * 28}
                    fill="none" stroke="white" strokeWidth="0.5" strokeOpacity={0.15 + i * 0.06}
                  />
                ))}
                <circle cx="144" cy="128" r="20" fill="white" fillOpacity="0.1" />
                <circle cx="144" cy="128" r="10" fill="white" fillOpacity="0.2" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-black text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-12 gap-y-4">
            {VALUES.map((v, i) => (
              <div key={v} className="flex items-center gap-3 text-sm">
                <span className="text-gray-600 font-mono text-xs">0{i + 1}</span>
                <span className="font-semibold text-white">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo — tarjeta única */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-black mb-8">{t('identity.team_title')}</h2>
          <div className="border border-black/10">
            {TEAM_MEMBERS.map(({ nameKey, roleKey, bioKey, initials }, idx) => (
              <div
                key={nameKey}
                className={`flex flex-col sm:flex-row gap-6 p-8 ${idx > 0 ? 'border-t border-black/10' : ''}`}
              >
                <div className="w-14 h-14 bg-black flex items-center justify-center shrink-0">
                  <span className="text-white text-sm font-black">{initials}</span>
                </div>
                <div>
                  <h3 className="text-base font-black text-black">{t(nameKey)}</h3>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mt-0.5">{t(roleKey)}</p>
                  <p className="mt-3 text-sm text-gray-700 leading-relaxed max-w-2xl">{t(bioKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

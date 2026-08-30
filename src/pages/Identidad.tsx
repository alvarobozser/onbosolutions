import { useTranslation } from 'react-i18next'
import TeamCard from '../components/identidad/TeamCard'

const VALUES = [
  { titleKey: 'identity.values.security_title', subKey: 'identity.values.security_sub' },
  { titleKey: 'identity.values.ai_title', subKey: 'identity.values.ai_sub' },
  { titleKey: 'identity.values.software_title', subKey: 'identity.values.software_sub' },
  { titleKey: 'identity.values.scale_title', subKey: 'identity.values.scale_sub' },
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

      {/* Cita + imagen abstracta */}
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
            {/* Imagen abstracta generada con SVG */}
            <div className="lg:w-72 h-48 lg:h-64 relative overflow-hidden shrink-0">
              <svg viewBox="0 0 288 256" className="w-full h-full" aria-hidden="true">
                <defs>
                  <linearGradient id="tunnel" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <rect
                    key={i}
                    x={i * 16}
                    y={i * 14}
                    width={288 - i * 32}
                    height={256 - i * 28}
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                    strokeOpacity={0.15 + i * 0.06}
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {VALUES.map(({ titleKey, subKey }) => (
              <div key={titleKey} className="bg-black p-8">
                <p className="text-xl font-black">{t(titleKey)}</p>
                <p className="text-sm text-gray-400 mt-1">{t(subKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-black mb-12">{t('identity.team_title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10">
            {TEAM_MEMBERS.map(({ nameKey, roleKey, bioKey, initials }) => (
              <div key={nameKey} className="bg-white">
                <TeamCard
                  name={t(nameKey)}
                  role={t(roleKey)}
                  bio={t(bioKey)}
                  initials={initials}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

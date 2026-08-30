const LOGOS = [
  'Acme Corp',
  'Nexus Digital',
  'Vertex Tech',
  'Solara Group',
  'Meridian Labs',
  'Apex Systems',
  'Orion Cloud',
  'Cascade IO',
]

function LogoPlaceholder({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center px-8 h-12 grayscale opacity-50 hover:opacity-80 transition-opacity shrink-0">
      <span className="text-sm font-bold uppercase tracking-widest text-black whitespace-nowrap">{name}</span>
    </div>
  )
}

export default function LogoCarousel() {
  return (
    <div className="bg-white py-12 overflow-hidden border-y border-black/10">
      <div
        className="flex"
        style={{
          animation: 'scroll-logos 30s linear infinite',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused'
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running'
        }}
      >
        {[...LOGOS, ...LOGOS].map((name, i) => (
          <LogoPlaceholder key={`${name}-${i}`} name={name} />
        ))}
      </div>
      <style>{`
        @keyframes scroll-logos {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

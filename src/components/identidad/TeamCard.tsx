interface TeamCardProps {
  name: string
  role: string
  bio: string
  initials: string
}

export default function TeamCard({ name, role, bio, initials }: TeamCardProps) {
  return (
    <div className="border border-black/10 p-8 flex flex-col">
      {/* Avatar geométrico */}
      <div className="w-16 h-16 bg-black flex items-center justify-center mb-6">
        <span className="text-white text-lg font-black">{initials}</span>
      </div>
      <h3 className="text-lg font-black text-black">{name}</h3>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mt-1">{role}</p>
      <p className="mt-4 text-sm text-gray-700 leading-relaxed">{bio}</p>
    </div>
  )
}

import type { ReactNode } from 'react'

interface SplitCardProps {
  left: ReactNode
  right: ReactNode
}

export default function SplitCard({ left, right }: SplitCardProps) {
  return (
    <div className="group relative flex flex-col lg:flex-row border-2 border-black hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
      {/* Barra de acento: aparece/crece al hacer hover en la fila */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-1.5 transition-all duration-300 ease-out"
        style={{ backgroundColor: 'var(--accent)' }}
      />
      <div className="flex-1 p-8 lg:p-12 bg-white relative">{left}</div>
      <div className="lg:w-80 xl:w-96 p-8 lg:p-12 bg-black text-white border-t-2 border-t-black lg:border-t-0 lg:border-l-2 lg:border-l-black relative">{right}</div>
    </div>
  )
}

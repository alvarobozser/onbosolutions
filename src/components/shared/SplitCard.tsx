import type { ReactNode } from 'react'

interface SplitCardProps {
  left: ReactNode
  right: ReactNode
}

export default function SplitCard({ left, right }: SplitCardProps) {
  return (
    <div className="flex flex-col lg:flex-row border border-black/10">
      <div className="flex-1 p-8 lg:p-12 bg-white">{left}</div>
      <div className="lg:w-80 xl:w-96 p-8 lg:p-12 bg-black text-white">{right}</div>
    </div>
  )
}

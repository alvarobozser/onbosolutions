import { useState, type ReactNode } from 'react'
import { ActiveSectionContext, type Section } from './activeSectionContextValue'

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<Section>(null)
  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  )
}

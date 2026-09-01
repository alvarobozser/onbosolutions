import { createContext, useContext, useState, type ReactNode } from 'react'

type Section = 'home' | 'servicios' | 'quienes-somos' | 'recursos' | null

interface ActiveSectionCtx {
  activeSection: Section
  setActiveSection: (s: Section) => void
}

const ActiveSectionContext = createContext<ActiveSectionCtx>({
  activeSection: null,
  setActiveSection: () => {},
})

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<Section>(null)
  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  )
}

export function useActiveSection() {
  return useContext(ActiveSectionContext)
}

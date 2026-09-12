import { createContext } from 'react'

export type Section = 'home' | 'servicios' | 'quienes-somos' | 'recursos' | null

interface ActiveSectionContextValue {
  activeSection: Section
  setActiveSection: (section: Section) => void
}

export const ActiveSectionContext = createContext<ActiveSectionContextValue>({
  activeSection: null,
  setActiveSection: () => {},
})

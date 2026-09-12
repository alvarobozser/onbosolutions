import { useContext } from 'react'
import { ActiveSectionContext } from './activeSectionContextValue'

export function useActiveSection() {
  return useContext(ActiveSectionContext)
}

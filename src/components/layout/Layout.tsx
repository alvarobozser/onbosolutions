import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import SectionDots from './SectionDots'
import WhatsAppFAB from './WhatsAppFAB'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* key=pathname → remonta en cada cambio de ruta, dispara el fade */}
      <div key={pathname} className={`flex-1 page-fade ${isHome ? '' : 'pt-16'}`}>{children}</div>
      <SectionDots />
      <WhatsAppFAB />
      <Footer />
    </div>
  )
}

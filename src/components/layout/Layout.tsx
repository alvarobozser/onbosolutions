import type { ReactNode } from 'react'
import Footer from './Footer'
import Header from './Header'
import WhatsAppFAB from './WhatsAppFAB'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">{children}</div>
      <WhatsAppFAB />
      <Footer />
    </div>
  )
}

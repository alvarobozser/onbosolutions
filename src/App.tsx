import { HashRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/layout/ScrollToTop'
import Contacto from './pages/Contacto'
import Home from './pages/Home'
import BlogArticle from './pages/BlogArticle'
import NotFound from './pages/NotFound'
import Privacidad from './pages/Privacidad'
import { ActiveSectionProvider } from './context/ActiveSectionContext'

export default function App() {
  return (
    <ActiveSectionProvider>
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout><Home /></Layout>} path="/" />
        <Route element={<Layout><Contacto /></Layout>} path="/contacto" />
        <Route element={<Layout><BlogArticle /></Layout>} path="/blog/:slug" />
        <Route element={<Layout><Privacidad /></Layout>} path="/privacidad" />
        <Route element={<Layout><NotFound /></Layout>} path="*" />
      </Routes>
    </HashRouter>
    </ActiveSectionProvider>
  )
}

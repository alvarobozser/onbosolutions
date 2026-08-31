import { HashRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/layout/ScrollToTop'
import Contacto from './pages/Contacto'
import Home from './pages/Home'
import Identidad from './pages/Identidad'
import Blog from './pages/Blog'
import Privacidad from './pages/Privacidad'
import Servicios from './pages/Servicios'

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout><Home /></Layout>} path="/" />
        <Route element={<Layout><Servicios /></Layout>} path="/servicios" />
        <Route element={<Layout><Identidad /></Layout>} path="/identidad" />
        <Route element={<Layout><Contacto /></Layout>} path="/contacto" />
        <Route element={<Layout><Blog /></Layout>} path="/blog" />
        <Route element={<Layout><Privacidad /></Layout>} path="/privacidad" />
      </Routes>
    </HashRouter>
  )
}

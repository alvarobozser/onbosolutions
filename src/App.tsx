import { HashRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Contacto from './pages/Contacto'
import Guias from './pages/Guias'
import Home from './pages/Home'
import Identidad from './pages/Identidad'
import Servicios from './pages/Servicios'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout><Home /></Layout>} path="/" />
        <Route element={<Layout><Servicios /></Layout>} path="/servicios" />
        <Route element={<Layout><Guias /></Layout>} path="/guias" />
        <Route element={<Layout><Identidad /></Layout>} path="/identidad" />
        <Route element={<Layout><Contacto /></Layout>} path="/contacto" />
      </Routes>
    </HashRouter>
  )
}

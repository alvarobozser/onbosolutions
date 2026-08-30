import { HashRouter, Route, Routes } from 'react-router-dom'
import Contacto from './pages/Contacto'
import Guias from './pages/Guias'
import Home from './pages/Home'
import Identidad from './pages/Identidad'
import Servicios from './pages/Servicios'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/guias" element={<Guias />} />
        <Route path="/identidad" element={<Identidad />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </HashRouter>
  )
}

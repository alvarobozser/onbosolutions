import { Link } from 'react-router-dom'
import { useMeta } from '../hooks/useMeta'

export default function NotFound() {
  useMeta({ title: 'Página no encontrada' })

  return (
    <main className="bg-white min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
        <div className="max-w-lg">

          {/* Chevron ONBO */}
          <svg
            viewBox="0 0 20 16"
            fill="black"
            className="w-10 h-8 mb-10 opacity-10"
            aria-hidden="true"
          >
            <path d="M0 0h12l8 8-8 8H0l8-8L0 0z" />
          </svg>

          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-medium">Error 404</p>
          <h1 className="text-4xl sm:text-5xl font-black text-black leading-tight">
            Esta página<br />no existe.
          </h1>
          <p className="mt-6 text-gray-500 leading-relaxed max-w-sm">
            La URL que buscas no corresponde a ninguna sección de la web.
            Puede que haya cambiado o que haya un error en el enlace.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/"
              className="bg-black text-white font-semibold px-6 py-3 text-sm hover:bg-gray-900 transition-colors"
            >
              Ir al inicio →
            </Link>
            <Link
              to="/contacto"
              className="border border-black text-black font-semibold px-6 py-3 text-sm hover:bg-black hover:text-white transition-colors"
            >
              Contactar
            </Link>
          </div>

        </div>
      </div>
    </main>
  )
}

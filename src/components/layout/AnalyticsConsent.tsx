import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  denyAnalyticsConsent,
  grantAnalyticsConsent,
  hasAnalyticsConsent,
  hasAnalyticsConsentDecision,
  isAnalyticsConfigured,
  loadGoogleAnalytics,
} from '../../analytics/analytics'

export default function AnalyticsConsent() {
  const [isVisible, setIsVisible] = useState(() => isAnalyticsConfigured() && !hasAnalyticsConsentDecision())

  useEffect(() => {
    if (hasAnalyticsConsent()) loadGoogleAnalytics()
  }, [])

  if (!isVisible || hasAnalyticsConsent()) return null

  function acceptAnalytics() {
    grantAnalyticsConsent()
    loadGoogleAnalytics()
    setIsVisible(false)
  }

  function rejectAnalytics() {
    denyAnalyticsConsent()
    setIsVisible(false)
  }

  return (
    <aside
      className="fixed bottom-4 left-4 right-4 z-50 border border-black bg-white p-5 shadow-xl sm:left-auto sm:max-w-md"
      role="region"
      aria-label="Preferencias de analítica"
    >
      <h2 className="text-base font-bold text-black">Analítica opcional</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        Podemos usar Google Analytics para medir el uso de la web y mejorarla. Solo se activará si aceptas.
        {' '}<Link to="/privacidad" className="underline underline-offset-2 hover:text-black">Más información</Link>.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={acceptAnalytics} className="bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2">
          Aceptar
        </button>
        <button type="button" onClick={rejectAnalytics} className="border border-black px-4 py-2 text-sm font-semibold text-black hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2">
          Rechazar
        </button>
      </div>
    </aside>
  )
}

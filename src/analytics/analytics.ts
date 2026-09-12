const CONSENT_STORAGE_KEY = 'onbo.analytics.consent.v1'
const CONSENT_GRANTED = 'granted'
const CONSENT_DENIED = 'denied'
const GOOGLE_ANALYTICS_SCRIPT_ID = 'onbo-google-analytics'

type AnalyticsWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
}

function getMeasurementId() {
  return (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim() ?? ''
}

function getStoredConsent() {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY)
  } catch {
    return null
  }
}

export function isAnalyticsConfigured() {
  return Boolean(getMeasurementId())
}

export function hasAnalyticsConsent() {
  return getStoredConsent() === CONSENT_GRANTED
}

export function hasAnalyticsConsentDecision() {
  const consent = getStoredConsent()
  return consent === CONSENT_GRANTED || consent === CONSENT_DENIED
}

function storeConsent(value: string) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value)
  } catch {
    // Privacy controls must not break the page when storage is unavailable.
  }
}

export function grantAnalyticsConsent() {
  storeConsent(CONSENT_GRANTED)
}

export function denyAnalyticsConsent() {
  storeConsent(CONSENT_DENIED)
}

let isGoogleAnalyticsLoaded = false

export function loadGoogleAnalytics() {
  if (isGoogleAnalyticsLoaded || !hasAnalyticsConsent()) return false
  const measurementId = getMeasurementId()
  if (!measurementId || typeof document === 'undefined' || typeof window === 'undefined') return false

  try {
    if (document.getElementById(GOOGLE_ANALYTICS_SCRIPT_ID)) {
      isGoogleAnalyticsLoaded = true
      return true
    }

    const analyticsWindow = window as AnalyticsWindow
    analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? []
    analyticsWindow.gtag = analyticsWindow.gtag ?? ((...args: unknown[]) => analyticsWindow.dataLayer?.push(args))
    analyticsWindow.gtag('js', new Date())
    analyticsWindow.gtag('config', measurementId)

    const script = document.createElement('script')
    script.id = GOOGLE_ANALYTICS_SCRIPT_ID
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
    document.head.appendChild(script)
    isGoogleAnalyticsLoaded = true
    return true
  } catch {
    return false
  }
}

export function trackEvent(eventName: string) {
  if (!hasAnalyticsConsent() || !getMeasurementId() || typeof window === 'undefined') return
  const analyticsWindow = window as AnalyticsWindow
  analyticsWindow.gtag?.('event', eventName)
}

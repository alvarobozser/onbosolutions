import { afterEach, describe, expect, it, vi } from 'vitest'

const CONSENT_STORAGE_KEY = 'onbo.analytics.consent.v1'

describe('analytics', () => {
  afterEach(() => {
    localStorage.clear()
    document.getElementById('onbo-google-analytics')?.remove()
    delete (window as Window & { dataLayer?: unknown[] }).dataLayer
    delete (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
    vi.resetModules()
    vi.unstubAllEnvs()
  })

  it('no carga GA ni envía eventos sin consentimiento', async () => {
    // Arrange
    vi.stubEnv('VITE_GA_MEASUREMENT_ID', 'G-TEST123')
    const analytics = await import('./analytics')
    const gtag = vi.fn()
    const analyticsWindow = window as Window & { gtag?: (...args: unknown[]) => void }
    analyticsWindow.gtag = gtag

    // Act
    analytics.trackEvent('cta_hero')
    const loaded = analytics.loadGoogleAnalytics()

    // Assert
    expect(loaded).toBe(false)
    expect(gtag).not.toHaveBeenCalled()
    expect(document.getElementById('onbo-google-analytics')).not.toBeInTheDocument()
  })

  it('carga GA una sola vez después de aceptar y registra el consentimiento', async () => {
    // Arrange
    vi.stubEnv('VITE_GA_MEASUREMENT_ID', 'G-TEST123')
    const analytics = await import('./analytics')

    // Act
    analytics.grantAnalyticsConsent()
    const firstLoad = analytics.loadGoogleAnalytics()
    const secondLoad = analytics.loadGoogleAnalytics()

    // Assert
    expect(localStorage.getItem(CONSENT_STORAGE_KEY)).toBe('granted')
    expect(firstLoad).toBe(true)
    expect(secondLoad).toBe(false)
    expect(document.querySelectorAll('#onbo-google-analytics')).toHaveLength(1)
    expect((window as Window & { dataLayer?: unknown[] }).dataLayer).toHaveLength(2)
  })

  it('no hace nada si no existe un ID de medición', async () => {
    // Arrange
    vi.stubEnv('VITE_GA_MEASUREMENT_ID', '')
    const analytics = await import('./analytics')
    analytics.grantAnalyticsConsent()

    // Act
    const loaded = analytics.loadGoogleAnalytics()

    // Assert
    expect(analytics.isAnalyticsConfigured()).toBe(false)
    expect(loaded).toBe(false)
    expect(document.getElementById('onbo-google-analytics')).not.toBeInTheDocument()
  })
})

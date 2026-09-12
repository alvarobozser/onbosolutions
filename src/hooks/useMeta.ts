import { useEffect } from 'react'

interface MetaOptions {
  title: string
  description?: string
  type?: 'website' | 'article'
}

const SITE = 'ONBO Solutions'
const BASE_URL = 'https://alvarobozser.github.io/onbosolutions'
const DEFAULT_IMAGE = `${BASE_URL}/favicon.svg`

export function useMeta({ title, description, type = 'website' }: MetaOptions) {
  useEffect(() => {
    const fullTitle = title === SITE ? title : `${title} — ${SITE}`
    document.title = fullTitle

    const set = (attr: 'name' | 'property', key: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.content = value
    }

    const remove = (attr: 'name' | 'property', key: string) => {
      document.querySelector(`meta[${attr}="${key}"]`)?.remove()
    }

    if (description) {
      set('name', 'description', description)
      set('property', 'og:description', description)
      set('name', 'twitter:description', description)
    } else {
      remove('name', 'description')
      remove('property', 'og:description')
      remove('name', 'twitter:description')
    }

    set('property', 'og:title', fullTitle)
    set('property', 'og:type', type)
    const route = window.location.hash.replace(/^#/, '') || '/'
    const canonicalUrl = `${BASE_URL}/#${route}`
    set('property', 'og:url', canonicalUrl)
    set('name', 'twitter:title', fullTitle)
    set('name', 'twitter:card', 'summary_large_image')
    set('property', 'og:image', DEFAULT_IMAGE)
    set('name', 'twitter:image', DEFAULT_IMAGE)
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl
  }, [title, description, type])
}

import { useEffect } from 'react'

interface MetaOptions {
  title: string
  description?: string
}

const SITE = 'ONBO Solutions'
const BASE_URL = 'https://alvarobozser.github.io/onbosolutions'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`

export function useMeta({ title, description }: MetaOptions) {
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

    if (description) {
      set('name', 'description', description)
      set('property', 'og:description', description)
      set('name', 'twitter:description', description)
    }

    set('property', 'og:title', fullTitle)
    set('name', 'twitter:title', fullTitle)
    set('property', 'og:image', DEFAULT_IMAGE)
    set('name', 'twitter:image', DEFAULT_IMAGE)
  }, [title, description])
}

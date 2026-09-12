import { useEffect, useRef, type ReactNode } from 'react'

type Variant = 'up' | 'left' | 'right' | 'scale'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  variant?: Variant
  /**
   * Si true, los hijos directos del wrapper se animan en cascada en lugar
   * del wrapper entero. Útil para listas o bloques que ya comparten layout.
   */
  stagger?: boolean
}

export default function Reveal({ children, delay = 0, className = '', variant = 'up', stagger = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respeta prefers-reduced-motion: si el usuario lo pide, mostramos
    // el contenido directamente sin esperar al observer.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      el.classList.add('reveal-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`
          el.classList.add('reveal-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -36px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      data-variant={variant}
      className={`reveal ${stagger ? 'reveal-stagger' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
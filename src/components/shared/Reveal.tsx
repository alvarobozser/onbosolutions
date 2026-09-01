import { useEffect, useRef, type ReactNode } from 'react'

type Variant = 'up' | 'left' | 'right' | 'scale'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  variant?: Variant
}

export default function Reveal({ children, delay = 0, className = '', variant = 'up' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
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
    <div ref={ref} data-variant={variant} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

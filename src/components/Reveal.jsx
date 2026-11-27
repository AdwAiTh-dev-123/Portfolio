import { useEffect, useRef, useState } from 'react'

/**
 * Scroll-triggered reveal wrapper using IntersectionObserver.
 * Respects reduced motion via CSS and ensures elements remain visible once revealed.
 */
export default function Reveal({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  threshold = 0.12,
  as: Component = 'div',
}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold,
        rootMargin: '0px 0px -48px 0px',
      }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <Component
      ref={ref}
      className={`reveal reveal--${variant} ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Component>
  )
}

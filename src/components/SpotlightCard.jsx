import { useCallback, useRef } from 'react'

/**
 * Glassmorphic surface card with subtle cursor-tracking radial spotlight glow.
 */
export default function SpotlightCard({
  children,
  className = '',
  as: Component = 'div',
  ...props
}) {
  const cardRef = useRef(null)

  const handleMouseMove = useCallback((event) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }, [])

  return (
    <Component
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  )
}

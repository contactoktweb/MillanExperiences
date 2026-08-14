import { useRef, useCallback } from "react"

interface UseSwipeOptions {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  threshold?: number
}

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  threshold = 40,
}: UseSwipeOptions) {
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const touchEndY = useRef<number | null>(null)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchEndX.current = null
    touchEndY.current = null
    if (e.targetTouches.length > 0) {
      touchStartX.current = e.targetTouches[0].clientX
      touchStartY.current = e.targetTouches[0].clientY
    }
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.targetTouches.length > 0) {
      touchEndX.current = e.targetTouches[0].clientX
      touchEndY.current = e.targetTouches[0].clientY
    }
  }, [])

  const onTouchEnd = useCallback(() => {
    if (touchStartX.current === null || touchEndX.current === null) return
    if (touchStartY.current === null || touchEndY.current === null) return

    const diffX = touchStartX.current - touchEndX.current
    const diffY = touchStartY.current - touchEndY.current

    // Only consider it a horizontal swipe if horizontal movement is greater than vertical movement
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        // Swiped Left -> go to Next
        onSwipeLeft?.()
      } else {
        // Swiped Right -> go to Prev
        onSwipeRight?.()
      }
    }

    touchStartX.current = null
    touchStartY.current = null
    touchEndX.current = null
    touchEndY.current = null
  }, [onSwipeLeft, onSwipeRight, threshold])

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}

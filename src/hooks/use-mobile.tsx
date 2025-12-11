import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Use a ref to avoid re-renders and forced reflows
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // SSR-safe initial check using matchMedia (no reflow)
    if (typeof window === 'undefined') return false
    return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches
  })

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Use matchMedia result directly (no reflow)
    const onChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }
    
    // Set initial value from matchMedia (avoids innerWidth reflow)
    setIsMobile(mql.matches)
    
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile
}

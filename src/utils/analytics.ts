declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Push events to GTM dataLayer and gtag when available. */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: eventName, ...params });

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

export const ANALYTICS_EVENTS = {
  CALCULATOR_OPENED: 'calculator_opened',
  CALCULATION_COMPLETED: 'calculation_completed',
  WHATSAPP_CTA_CLICKED: 'whatsapp_cta_clicked',
} as const;

export type AnalyticsValue = string | number | boolean;
export type AnalyticsData = Record<string, AnalyticsValue>;

interface UmamiApi {
  track: (eventName?: string, eventData?: AnalyticsData) => void;
}

declare global {
  interface Window {
    umami?: UmamiApi;
  }
}

/**
 * Track an explicit portfolio interaction when Umami is configured.
 * No event is sent when analytics is not configured or has not loaded yet.
 */
export function trackEvent(eventName: string, data?: AnalyticsData) {
  if (typeof window === 'undefined' || typeof window.umami?.track !== 'function') {
    return;
  }

  try {
    window.umami.track(eventName, data);
  } catch {
    // Analytics must never interrupt the visitor's action.
  }
}

/**
 * Google Analytics mocking utilities for tests
 */

/**
 * Mocks Google Analytics window.gtag and window.dataLayer.
 * Returns the mock gtag function and a cleanup function.
 *
 * @returns Object containing mockGtag and cleanup function
 * @example
 * const { mockGtag, cleanup } = mockGoogleAnalytics();
 * // ... run tests
 * cleanup();
 */
export function mockGoogleAnalytics() {
  const mockGtag = jest.fn();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).gtag = mockGtag;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).dataLayer = [];

  const cleanup = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any).gtag;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any).dataLayer;
  };

  return { mockGtag, cleanup };
}

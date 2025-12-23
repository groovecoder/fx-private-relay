/**
 * Shared test helper functions for mocking common patterns across test files.
 */

/**
 * Mocks the useFirstSeen hook to return a date N days ago.
 *
 * @param daysAgo - Number of days in the past (0 = now, 7 = 7 days ago)
 * @example
 * mockFirstSeen(7); // User first seen 7 days ago
 */
export function mockFirstSeen(daysAgo: number): void {
  const useFirstSeen =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (jest.requireMock("../src/hooks/firstSeen.ts") as any).useFirstSeen;
  useFirstSeen.mockReturnValue(
    new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
  );
}

/**
 * Mocks the useFirstSeen hook to return a date N days ago (one-time use).
 * Use this when you need different values in the same test file.
 *
 * @param daysAgo - Number of days in the past
 */
export function mockFirstSeenOnce(daysAgo: number): void {
  const useFirstSeen =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (jest.requireMock("../src/hooks/firstSeen.ts") as any).useFirstSeen;
  useFirstSeen.mockReturnValueOnce(
    new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
  );
}

/**
 * Mocks the getCookie function to simulate a dismissed survey/banner.
 *
 * @param cookieKey - The cookie key to match (e.g., "free-7days", "premium-30days")
 * @param isDismissed - Whether the item is dismissed (default: true)
 * @example
 * mockCookieDismissal("free-7days"); // User dismissed the free 7-day survey
 * mockCookieDismissal("premium-30days", false); // User has not dismissed
 */
export function mockCookieDismissal(
  cookieKey: string,
  isDismissed = true,
): void {
  const getCookie: jest.Mock =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (jest.requireMock("../src/functions/cookies.ts") as any).getCookie;
  getCookie.mockImplementation((key: string) =>
    key.includes(cookieKey)
      ? isDismissed
        ? Date.now()
        : undefined
      : undefined,
  );
}

/**
 * Mocks the useLocalDismissal hook.
 *
 * @param isDismissed - Whether the item is dismissed (default: false)
 * @returns The mock dismiss function for assertions
 * @example
 * const mockDismiss = mockLocalDismissal(false);
 * // ... render component
 * expect(mockDismiss).toHaveBeenCalledTimes(1);
 */
export function mockLocalDismissal(isDismissed = false): jest.Mock {
  const useLocalDismissal =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (jest.requireMock("../src/hooks/localDismissal.ts") as any)
      .useLocalDismissal;
  const mockDismiss = jest.fn();
  useLocalDismissal.mockReturnValue({
    isDismissed,
    dismiss: mockDismiss,
  });
  return mockDismiss;
}

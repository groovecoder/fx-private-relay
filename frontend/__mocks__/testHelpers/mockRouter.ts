/**
 * Next.js Router mocking utilities for tests
 */

/**
 * Mocks the Next.js useRouter hook with default values.
 *
 * @param pathname - The current pathname (default: "/")
 * @param additionalProps - Additional properties to include in the router mock
 * @returns Object containing the mocked useRouter and mockPush function
 * @example
 * const { mockPush } = mockRouter("/premium");
 * // ... test code
 * expect(mockPush).toHaveBeenCalledWith("/some-route");
 */
export function mockRouter(
  pathname = "/",
  additionalProps: Record<string, any> = {},
) {
  const useRouter =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (jest.requireMock("next/router") as any).useRouter;
  const mockPush = jest.fn();
  useRouter.mockReturnValue({
    pathname,
    push: mockPush,
    ...additionalProps,
  });
  return { useRouter, mockPush };
}

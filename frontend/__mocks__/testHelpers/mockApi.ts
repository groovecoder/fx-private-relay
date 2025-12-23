/**
 * API mocking utilities for tests
 */

import { renderHook } from "@testing-library/react";

/**
 * Sets up a mock for useApiV1 with default values.
 *
 * @param useApiV1Mock - The useApiV1 mock function from jest.requireMock
 * @param options - Optional overrides for the mock return value
 * @returns The mocked useApiV1 function
 * @example
 * const useApiV1 = jest.requireMock("./api").useApiV1;
 * setupMockUseApiV1(useApiV1, { data: [mockData], mutate: mockMutate });
 */
export function setupMockUseApiV1(
  useApiV1Mock: jest.Mock,
  options: {
    data?: any;
    error?: any;
    isLoading?: boolean;
    isValidating?: boolean;
    mutate?: jest.Mock;
  } = {},
) {
  useApiV1Mock.mockReturnValue({
    data: [],
    error: undefined,
    isLoading: false,
    isValidating: false,
    mutate: jest.fn(),
    ...options,
  });
  return useApiV1Mock;
}

/**
 * Sets up standard API test mocks (mockMutate and mockApiFetch).
 * Returns these mocks and a beforeEachSetup function to call in beforeEach.
 *
 * @returns Object containing mockMutate, mockApiFetch, and beforeEachSetup function
 * @example
 * const { mockMutate, mockApiFetch, beforeEachSetup } = setupApiTestMocks();
 * beforeEach(() => {
 *   beforeEachSetup();
 *   const api = jest.requireMock("./api");
 *   api.apiFetch = mockApiFetch;
 * });
 */
export function setupApiTestMocks() {
  const mockMutate = jest.fn();
  const mockApiFetch = jest.fn();

  const beforeEachSetup = () => {
    jest.clearAllMocks();
    mockMutate.mockClear();
    mockApiFetch.mockClear();
  };

  return { mockMutate, mockApiFetch, beforeEachSetup };
}

/**
 * Tests an API action (create, update, delete) by setting up mocks,
 * calling the action, and verifying the expected API call and mutate call.
 *
 * @param options - Configuration for the test
 * @example
 * const useApiV1 = jest.requireMock("./api").useApiV1;
 * await testApiAction({
 *   useApiV1Mock: useApiV1,
 *   hook: () => useAliases(),
 *   action: "create",
 *   args: [{ mask_type: "random" }],
 *   expectedUrl: "/relayaddresses/",
 *   expectedMethod: "POST",
 *   expectedBody: { enabled: true },
 *   mockMutate,
 *   mockApiFetch,
 * });
 */
export async function testApiAction(options: {
  useApiV1Mock: jest.Mock;
  hook: () => any;
  action: string;
  args: any[];
  expectedUrl: string;
  expectedMethod: string;
  expectedBody?: any;
  mockMutate: jest.Mock;
  mockApiFetch: jest.Mock;
}) {
  const {
    useApiV1Mock,
    hook,
    action,
    args,
    expectedUrl,
    expectedMethod,
    expectedBody,
    mockMutate,
    mockApiFetch,
  } = options;

  mockApiFetch.mockResolvedValue({
    ok: true,
    json: async () => ({ success: true }),
  });

  setupMockUseApiV1(useApiV1Mock, { mutate: mockMutate });

  const { result } = renderHook(hook);
  await result.current[action](...args);

  const expectedOptions: { method: string; body?: string } = {
    method: expectedMethod,
  };
  if (expectedBody !== undefined) {
    expectedOptions.body = JSON.stringify(expectedBody);
  }

  expect(mockApiFetch).toHaveBeenCalledWith(expectedUrl, expectedOptions);
  expect(mockMutate).toHaveBeenCalledTimes(1);
}

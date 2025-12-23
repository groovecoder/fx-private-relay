/**
 * Icon component testing utilities
 */

import { render, screen } from "@testing-library/react";
import React from "react";

/**
 * Tests standard icon component accessibility features.
 * Creates a describe block with tests for alt text rendering and aria-hidden behavior.
 *
 * @param IconComponent - The icon component to test
 * @param iconName - The name of the icon (used in test descriptions and alt text)
 * @example
 * testIconAccessibility(InfoIcon, "Information");
 */
export function testIconAccessibility(
  IconComponent: React.ComponentType<{ alt: string }>,
  iconName: string,
) {
  describe(`${iconName} accessibility`, () => {
    it("renders with alt text", () => {
      render(React.createElement(IconComponent, { alt: iconName }));
      const icon = screen.getByRole("img", { name: iconName });
      expect(icon).toBeInTheDocument();
    });

    it("is hidden from screen readers when alt is empty", () => {
      const { container } = render(
        React.createElement(IconComponent, { alt: "" }),
      );
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });
  });
}

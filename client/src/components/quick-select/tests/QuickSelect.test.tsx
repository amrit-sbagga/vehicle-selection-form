import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuickSelect from "../QuickSelect";

describe("QuickSelect", () => {
  it("calls onSelect with preset values when a shortcut is clicked", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    render(<QuickSelect onSelect={onSelect} />);

    await user.click(
      screen.getByRole("button", {
        name: /tesla model 3 performance/i,
      })
    );

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(
      "Tesla",
      "Model 3",
      "Performance"
    );
  });
});

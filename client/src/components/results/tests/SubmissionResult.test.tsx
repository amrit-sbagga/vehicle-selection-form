import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SubmissionResult from "../SubmissionResult";

const data = {
  make: "Ford",
  model: "Ranger",
  badge: "Raptor",
  logbook: "line1\nline2",
};

describe("SubmissionResult", () => {
  it("renders vehicle fields and logbook", () => {
    render(
      <SubmissionResult data={data} onDismiss={vi.fn()} />
    );

    expect(screen.getByText("Ford")).toBeInTheDocument();
    expect(screen.getByText("Ranger")).toBeInTheDocument();
    expect(screen.getByText("Raptor")).toBeInTheDocument();
    expect(screen.getByText(/line1/)).toBeInTheDocument();
  });

  it("invokes onDismiss when Back to form is clicked", async () => {
    const onDismiss = vi.fn();
    const user = userEvent.setup();

    render(
      <SubmissionResult data={data} onDismiss={onDismiss} />
    );

    await user.click(
      screen.getByRole("button", { name: /back to form/i })
    );

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});

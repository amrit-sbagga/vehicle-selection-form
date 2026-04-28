import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Vehicle Selection Form", () => {
  test("renders page title", () => {
    render(<App />);
    expect(
      screen.getByText(/Vehicle Selection Form/i)
    ).toBeInTheDocument();
  });

  test("model dropdown disabled initially", () => {
    render(<App />);
    const selects = screen.getAllByRole("combobox");

    expect(selects[1]).toBeDisabled();
  });

  test("selecting make enables model dropdown", async () => {
    render(<App />);
    const selects = screen.getAllByRole("combobox");

    await userEvent.selectOptions(selects[0], "Ford");

    expect(selects[1]).not.toBeDisabled();
  });

  test("submit button disabled initially", () => {
    render(<App />);
    expect(
      screen.getByRole("button", { name: /submit/i })
    ).toBeDisabled();
  });
});
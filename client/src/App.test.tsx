import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Drill Down Form", () => {
  test("renders page title", () => {
    render(<App />);

    expect(
      screen.getByText(/drill down form/i)
    ).toBeInTheDocument();
  });

  test("only make dropdown visible initially", () => {
    render(<App />);

    const selects =
      screen.getAllByRole("combobox");

    expect(selects).toHaveLength(1);

    expect(
      screen.getByRole("combobox")
    ).toBeInTheDocument();
  });

  test("selecting make shows model dropdown", async () => {
    render(<App />);

    const user = userEvent.setup();

    const makeSelect =
      screen.getByRole("combobox");

    await user.selectOptions(
      makeSelect,
      "Ford"
    );

    const selects =
      screen.getAllByRole("combobox");

    expect(selects).toHaveLength(2);
  });

  test("selecting make + model shows badge dropdown", async () => {
    render(<App />);

    const user = userEvent.setup();

    const makeSelect =
      screen.getByRole("combobox");

    await user.selectOptions(
      makeSelect,
      "Ford"
    );

    let selects =
      screen.getAllByRole("combobox");

    await user.selectOptions(
      selects[1],
      "Ranger"
    );

    selects =
      screen.getAllByRole("combobox");

    expect(selects).toHaveLength(3);
  });

  test("submit button hidden initially", () => {
    render(<App />);

    expect(
      screen.queryByRole("button", {
        name: /submit/i
      })
    ).not.toBeInTheDocument();
  });
});
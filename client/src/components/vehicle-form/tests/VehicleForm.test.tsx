import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import VehicleForm from "../VehicleForm";
import {
  VEHICLE_UPLOAD_RESULT_KEY,
} from "../../../utils/vehicleUploadResult";

function renderForm() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <VehicleForm />
            </div>
          }
        />
      </Routes>
    </MemoryRouter>
  );
}

async function selectFullVehicle(user: ReturnType<typeof userEvent.setup>) {
  const selects = screen.getAllByRole("combobox");
  await user.selectOptions(selects[0], "Ford");
  const afterMake = screen.getAllByRole("combobox");
  await user.selectOptions(afterMake[1], "Ranger");
  const afterModel = screen.getAllByRole("combobox");
  await user.selectOptions(afterModel[2], "Raptor");
}

describe("VehicleForm", () => {
  beforeEach(() => {
    sessionStorage.clear();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("submits successfully, persists result in sessionStorage, and calls fetch", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        make: "Ford",
        model: "Ranger",
        badge: "Raptor",
        logbook: "ok",
      }),
    } as Response);

    const user = userEvent.setup();
    renderForm();
    await selectFullVehicle(user);

    const fileInput = document.querySelector(
      'input[name="logbook"]'
    ) as HTMLInputElement;
    const file = new File(["log"], "book.txt", {
      type: "text/plain",
    });
    await user.upload(fileInput, file);

    await user.click(
      screen.getByRole("button", { name: /^submit$/i })
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/upload",
      expect.objectContaining({ method: "POST" })
    );

    const stored = sessionStorage.getItem(VEHICLE_UPLOAD_RESULT_KEY);
    expect(stored).toBeTruthy();
    expect(JSON.parse(stored!)).toMatchObject({
      make: "Ford",
      model: "Ranger",
      badge: "Raptor",
    });
  });

  it("shows validation errors for 400 validation_failed", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({
        error: "validation_failed",
        fieldErrors: { make: ["Required"] },
      }),
    } as Response);

    const user = userEvent.setup();
    renderForm();
    await selectFullVehicle(user);

    const fileInput = document.querySelector(
      'input[name="logbook"]'
    ) as HTMLInputElement;
    await user.upload(
      fileInput,
      new File(["x"], "x.txt", { type: "text/plain" })
    );

    await user.click(
      screen.getByRole("button", { name: /^submit$/i })
    );

    await waitFor(() => {
      expect(screen.getByText(/Required/i)).toBeInTheDocument();
    });
  });

  it("shows upload error message from JSON body", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({
        error: "upload_failed",
        message: "Only .txt files are allowed",
      }),
    } as Response);

    const user = userEvent.setup();
    renderForm();
    await selectFullVehicle(user);

    const fileInput = document.querySelector(
      'input[name="logbook"]'
    ) as HTMLInputElement;
    await user.upload(
      fileInput,
      new File(["x"], "x.txt", { type: "text/plain" })
    );

    await user.click(
      screen.getByRole("button", { name: /^submit$/i })
    );

    await waitFor(() => {
      expect(
        screen.getByText(/only \.txt files are allowed/i)
      ).toBeInTheDocument();
    });
  });
});

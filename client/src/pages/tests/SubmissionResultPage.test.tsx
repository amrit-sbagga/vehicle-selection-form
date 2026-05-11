import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SubmissionResultPage from "../SubmissionResultPage";
import {
  saveVehicleUploadResult,
  VEHICLE_UPLOAD_RESULT_KEY,
} from "../../utils/vehicleUploadResult";

function renderAtResult() {
  return render(
    <MemoryRouter initialEntries={["/result"]}>
      <Routes>
        <Route path="/" element={<div>Home marker</div>} />
        <Route path="/result" element={<SubmissionResultPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("SubmissionResultPage", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("shows empty state when session has no submission", () => {
    renderAtResult();

    expect(
      screen.getByRole("heading", { name: /no submission to show/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /return to form/i })
    ).toHaveAttribute("href", "/");
  });

  it("renders submission from sessionStorage", () => {
    saveVehicleUploadResult({
      make: "BMW",
      model: "130d",
      badge: "xDrive 26d",
      logbook: "note",
    });

    renderAtResult();

    expect(
      screen.getByRole("heading", { name: /submission result/i })
    ).toBeInTheDocument();
    expect(screen.getByText("BMW")).toBeInTheDocument();
    expect(screen.getByText("note")).toBeInTheDocument();
  });

  it("clears storage and navigates home when Back to form is used", async () => {
    saveVehicleUploadResult({
      make: "BMW",
      model: "130d",
      badge: "xDrive 26d",
      logbook: "x",
    });

    const user = userEvent.setup();
    renderAtResult();

    await user.click(
      screen.getByRole("button", { name: /back to form/i })
    );

    expect(sessionStorage.getItem(VEHICLE_UPLOAD_RESULT_KEY)).toBeNull();
    expect(screen.getByText("Home marker")).toBeInTheDocument();
  });
});

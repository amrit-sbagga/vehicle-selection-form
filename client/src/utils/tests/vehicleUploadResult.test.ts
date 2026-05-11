import { describe, it, expect, beforeEach } from "vitest";
import {
  VEHICLE_UPLOAD_RESULT_KEY,
  clearVehicleUploadResult,
  isVehicleUploadSuccess,
  readVehicleUploadResult,
  saveVehicleUploadResult,
} from "../vehicleUploadResult";

const sample = {
  make: "BMW",
  model: "130d",
  badge: "xDrive 26d",
  logbook: "service log",
};

describe("isVehicleUploadSuccess", () => {
  it("returns true for a valid payload", () => {
    expect(isVehicleUploadSuccess(sample)).toBe(true);
  });

  it("returns false when a field is missing", () => {
    expect(
      isVehicleUploadSuccess({
        make: "BMW",
        model: "130d",
        badge: "xDrive 26d",
      })
    ).toBe(false);
  });

  it("returns false for non-objects", () => {
    expect(isVehicleUploadSuccess(null)).toBe(false);
    expect(isVehicleUploadSuccess(undefined)).toBe(false);
    expect(isVehicleUploadSuccess("string")).toBe(false);
  });

  it("returns false when a field has the wrong type", () => {
    expect(
      isVehicleUploadSuccess({
        ...sample,
        logbook: 123,
      })
    ).toBe(false);
  });
});

describe("sessionStorage helpers", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("save then read returns the same payload", () => {
    saveVehicleUploadResult(sample);
    expect(readVehicleUploadResult()).toEqual(sample);
  });

  it("read returns null when key is missing", () => {
    expect(readVehicleUploadResult()).toBeNull();
  });

  it("read returns null for invalid JSON", () => {
    sessionStorage.setItem(VEHICLE_UPLOAD_RESULT_KEY, "{not json");
    expect(readVehicleUploadResult()).toBeNull();
  });

  it("read returns null when JSON does not match success shape", () => {
    sessionStorage.setItem(
      VEHICLE_UPLOAD_RESULT_KEY,
      JSON.stringify({ make: "only" })
    );
    expect(readVehicleUploadResult()).toBeNull();
  });

  it("clear removes the stored payload", () => {
    saveVehicleUploadResult(sample);
    clearVehicleUploadResult();
    expect(sessionStorage.getItem(VEHICLE_UPLOAD_RESULT_KEY)).toBeNull();
    expect(readVehicleUploadResult()).toBeNull();
  });
});

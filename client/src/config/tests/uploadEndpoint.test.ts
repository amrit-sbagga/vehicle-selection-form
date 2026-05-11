import { afterEach, describe, expect, it, vi } from "vitest";

describe("getVehicleUploadEndpoint", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("returns /api/upload when VITE_API_URL is empty", async () => {
    vi.stubEnv("VITE_API_URL", "");
    const { getVehicleUploadEndpoint } = await import("../uploadEndpoint");
    expect(getVehicleUploadEndpoint()).toBe("/api/upload");
  });

  it("returns /api/upload when VITE_API_URL is whitespace only", async () => {
    vi.stubEnv("VITE_API_URL", "   ");
    const { getVehicleUploadEndpoint } = await import("../uploadEndpoint");
    expect(getVehicleUploadEndpoint()).toBe("/api/upload");
  });

  it("returns trimmed VITE_API_URL when set", async () => {
    vi.stubEnv("VITE_API_URL", "  https://api.example/v1/upload  ");
    const { getVehicleUploadEndpoint } = await import("../uploadEndpoint");
    expect(getVehicleUploadEndpoint()).toBe(
      "https://api.example/v1/upload"
    );
  });
});

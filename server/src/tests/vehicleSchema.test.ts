import { describe, it, expect } from "vitest";
import { vehicleSchema } from "../validation/vehicleSchema";

describe("vehicleSchema", () => {
  it("parses valid body", () => {
    const r = vehicleSchema.safeParse({
      make: "Ford",
      model: "Ranger",
      badge: "Raptor",
    });
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data).toEqual({
        make: "Ford",
        model: "Ranger",
        badge: "Raptor",
      });
    }
  });

  it("fails when make is empty", () => {
    const r = vehicleSchema.safeParse({
      make: "",
      model: "Ranger",
      badge: "Raptor",
    });
    expect(r.success).toBe(false);
  });

  it("fails when model is missing", () => {
    const r = vehicleSchema.safeParse({
      make: "Ford",
      model: "",
      badge: "Raptor",
    });
    expect(r.success).toBe(false);
  });
});

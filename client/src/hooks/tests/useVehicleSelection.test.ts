import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useVehicleSelection from "../useVehicleSelection";

describe("useVehicleSelection", () => {
  it("starts with empty selection and only makes list", () => {
    const { result } = renderHook(() => useVehicleSelection());

    expect(result.current.make).toBe("");
    expect(result.current.model).toBe("");
    expect(result.current.badge).toBe("");
    expect(result.current.makes.length).toBeGreaterThan(0);
    expect(result.current.models).toEqual([]);
    expect(result.current.badges).toEqual([]);
  });

  it("updates models when a make is selected", () => {
    const { result } = renderHook(() => useVehicleSelection());

    act(() => {
      result.current.selectMake("Ford");
    });

    expect(result.current.make).toBe("Ford");
    expect(result.current.model).toBe("");
    expect(result.current.models).toContain("Ranger");
  });

  it("clears model and badge when make changes", () => {
    const { result } = renderHook(() => useVehicleSelection());

    act(() => {
      result.current.selectMake("Ford");
      result.current.selectModel("Ranger");
      result.current.selectBadge("Raptor");
    });

    act(() => {
      result.current.selectMake("BMW");
    });

    expect(result.current.make).toBe("BMW");
    expect(result.current.model).toBe("");
    expect(result.current.badge).toBe("");
  });

  it("exposes badges after make and model are set", () => {
    const { result } = renderHook(() => useVehicleSelection());

    act(() => {
      result.current.selectMake("Ford");
      result.current.selectModel("Ranger");
    });

    expect(result.current.badges.length).toBeGreaterThan(0);
  });

  it("applyPreset sets make, model, and badge", () => {
    const { result } = renderHook(() => useVehicleSelection());

    act(() => {
      result.current.applyPreset("Tesla", "Model 3", "Performance");
    });

    expect(result.current.make).toBe("Tesla");
    expect(result.current.model).toBe("Model 3");
    expect(result.current.badge).toBe("Performance");
  });
});

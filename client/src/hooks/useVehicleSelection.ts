import { useMemo, useState } from "react";
import { VEHICLE_DATA } from "../data/vehicles";
import type { VehicleMake } from "../types";

export default function useVehicleSelection() {
  const [make, setMake] = useState<VehicleMake | "">("");
  const [model, setModel] = useState("");
  const [badge, setBadge] = useState("");

  const makes = Object.keys(
    VEHICLE_DATA
  ) as VehicleMake[];

  const models = useMemo(() => {
    if (!make) return [];

    return Object.keys(
      VEHICLE_DATA[make]
    );
  }, [make]);

  const badges = useMemo(() => {
    if (!make || !model) return [];

    const selectedModels =
      VEHICLE_DATA[make];

    return (
      selectedModels[
        model as keyof typeof selectedModels
      ] || []
    );
  }, [make, model]);

  const selectMake = (value: string) => {
    setMake(value as VehicleMake);
    setModel("");
    setBadge("");
  };

  const selectModel = (value: string) => {
    setModel(value);
    setBadge("");
  };

  const selectBadge = (value: string) => {
    setBadge(value);
  };

  const applyPreset = (
    makeVal: string,
    modelVal: string,
    badgeVal: string
  ) => {
    setMake(makeVal as VehicleMake);
    setModel(modelVal);
    setBadge(badgeVal);
  };

  return {
    make,
    model,
    badge,
    makes,
    models,
    badges,
    selectMake,
    selectModel,
    selectBadge,
    applyPreset
  };
}
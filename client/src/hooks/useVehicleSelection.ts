import { useMemo, useState } from "react";
import { VEHICLE_DATA } from '../data/vehicles';

/* TYPES */
type VehicleData = typeof VEHICLE_DATA;
type Make = keyof VehicleData;

export default function useVehicleSelection() {
  const [make, setMake] = useState<Make | "">("");
  const [model, setModel] = useState("");
  const [badge, setBadge] = useState("");

  const makes = Object.keys(
    VEHICLE_DATA
  ) as Make[];

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
    setMake(value as Make);
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
    setMake(makeVal as Make);
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
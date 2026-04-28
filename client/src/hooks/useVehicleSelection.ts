import { useMemo, useState } from "react";
import { VEHICLES } from "../data/vehicles";

function useVehicleSelection() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [badge, setBadge] = useState("");

  const makes = Object.keys(VEHICLES);

  const models = useMemo(() => {
    if (!make) return [];
    return Object.keys(
      VEHICLES[make as keyof typeof VEHICLES]
    );
  }, [make]);

  const badges = useMemo(() => {
    if (!make || !model) return [];

    return VEHICLES[make as keyof typeof VEHICLES][
      model as keyof (typeof VEHICLES)[keyof typeof VEHICLES]
    ];
  }, [make, model]);

  const selectMake = (value: string) => {
    setMake(value);
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
    selectedMake: string,
    selectedModel: string,
    selectedBadge: string
  ) => {
    setMake(selectedMake);
    setModel(selectedModel);
    setBadge(selectedBadge);
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

export default useVehicleSelection;
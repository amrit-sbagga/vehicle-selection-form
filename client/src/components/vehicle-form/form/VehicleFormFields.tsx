import SelectField from "./fields/SelectField";
import type { VehicleFormFieldsProps } from "../../../types";

function VehicleFormFields({
  make,
  model,
  badge,
  makes,
  models,
  badges,
  selectMake,
  selectModel,
  selectBadge,
  showModel,
  showBadge
}: VehicleFormFieldsProps) {
  return (
    <>
      <SelectField
        label="Make"
        name="make"
        value={make}
        options={makes}
        onChange={selectMake}
      />

      {showModel && (
        <SelectField
          label="Model"
          name="model"
          value={model}
          options={models}
          onChange={selectModel}
        />
      )}

      {showBadge && (
        <SelectField
          label="Badge"
          name="badge"
          value={badge}
          options={badges}
          onChange={selectBadge}
        />
      )}
    </>
  );
}

export default VehicleFormFields;
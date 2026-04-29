import SelectField from "./fields/SelectField";

type Props = {
  make: string;
  model: string;
  badge: string;
  makes: string[];
  models: string[];
  badges: string[];
  selectMake: (v: string) => void;
  selectModel: (v: string) => void;
  selectBadge: (v: string) => void;
  showModel: boolean;
  showBadge: boolean;
};

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
}: Props) {
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
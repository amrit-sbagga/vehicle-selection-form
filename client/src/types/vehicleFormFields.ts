export type VehicleFormFieldsProps = {
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

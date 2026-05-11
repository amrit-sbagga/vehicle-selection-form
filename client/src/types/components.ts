import type { VehicleUploadSuccess } from "./vehicle";

export type SelectFieldProps = {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

export type FileUploadFieldProps = {
  onChange: (file: File | null) => void;
};

export type QuickSelectProps = {
  onSelect: (make: string, model: string, badge: string) => void;
};

export type SubmissionResultProps = {
  data: VehicleUploadSuccess;
  onDismiss: () => void;
};

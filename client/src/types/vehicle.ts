export type VehicleUploadSuccess = {
  make: string;
  model: string;
  badge: string;
  logbook: string;
};

export type VehicleValidationErrorBody = {
  error: "validation_failed";
  fieldErrors: Record<string, string[] | undefined>;
};

export type VehicleUploadErrorBody = {
  error: "upload_failed";
  message: string;
};

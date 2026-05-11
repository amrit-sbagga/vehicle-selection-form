import { Request, Response } from "express";
import { vehicleSchema } from "../validation/vehicleSchema";
import type {
  VehicleUploadSuccess,
  VehicleValidationErrorBody,
} from "../types/vehicle";

export const submitVehicle = (
  req: Request,
  res: Response
) => {
  const result =
    vehicleSchema.safeParse(req.body);

  if (!result.success) {
    const body: VehicleValidationErrorBody = {
      error: "validation_failed",
      fieldErrors: result.error.flatten().fieldErrors,
    };
    return res.status(400).json(body);
  }

  const { make, model, badge } =
    result.data;

  const file = req.file;

  const logbook = file
    ? file.buffer.toString("utf-8")
    : "No logbook uploaded";

  const body: VehicleUploadSuccess = {
    make,
    model,
    badge,
    logbook,
  };

  return res.status(200).json(body);
};

import type { VehicleUploadSuccess } from "../types/vehicle";

export const VEHICLE_UPLOAD_RESULT_KEY = "vehicleUploadResult";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

export function isVehicleUploadSuccess(
  body: unknown
): body is VehicleUploadSuccess {
  if (!isRecord(body)) return false;
  return (
    typeof body.make === "string" &&
    typeof body.model === "string" &&
    typeof body.badge === "string" &&
    typeof body.logbook === "string"
  );
}

export function saveVehicleUploadResult(
  data: VehicleUploadSuccess
): void {
  sessionStorage.setItem(
    VEHICLE_UPLOAD_RESULT_KEY,
    JSON.stringify(data)
  );
}

export function readVehicleUploadResult(): VehicleUploadSuccess | null {
  const raw = sessionStorage.getItem(VEHICLE_UPLOAD_RESULT_KEY);
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (isVehicleUploadSuccess(parsed)) return parsed;
  } catch {
    // ignore invalid JSON
  }
  return null;
}

export function clearVehicleUploadResult(): void {
  sessionStorage.removeItem(VEHICLE_UPLOAD_RESULT_KEY);
}

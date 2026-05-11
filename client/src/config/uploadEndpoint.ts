/** POST target for vehicle + logbook upload (relative in dev so Vite can proxy). */
export function getVehicleUploadEndpoint(): string {
  const v = import.meta.env.VITE_API_URL;
  if (v !== undefined && String(v).trim() !== "") {
    return String(v).trim();
  }
  return "/api/upload";
}

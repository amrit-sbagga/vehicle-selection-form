export interface VehicleSelection {
  make: string;
  model: string;
  badge: string;
}

export interface VehicleResponse extends VehicleSelection {
  logbook: string;
}
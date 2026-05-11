import { VEHICLE_DATA } from "../data/vehicles";

export type VehicleDataset = typeof VEHICLE_DATA;
export type VehicleMake = keyof VehicleDataset;

import { z } from "zod";

const vehicleSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  badge: z.string().min(1, "Badge is required")
});

export { vehicleSchema };
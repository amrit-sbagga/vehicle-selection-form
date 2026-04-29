import { Router } from "express";
import upload from "../middleware/upload";
import { submitVehicle } from "../controllers/vehicleController";

const router = Router();

router.post(
  "/upload",
  upload.single("logbook"),
  submitVehicle
);

export default router;
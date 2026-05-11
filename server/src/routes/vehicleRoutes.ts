import { Router, Request, Response, NextFunction } from "express";
import multer from "multer";
import upload from "../middleware/upload";
import { submitVehicle } from "../controllers/vehicleController";

const router = Router();

router.post(
  "/upload",
  (req: Request, res: Response, next: NextFunction) => {
    upload.single("logbook")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          error: "upload_failed",
          message: err.message,
        });
      }
      if (err instanceof Error) {
        return res.status(400).json({
          error: "upload_failed",
          message: err.message,
        });
      }
      next();
    });
  },
  submitVehicle
);

export default router;
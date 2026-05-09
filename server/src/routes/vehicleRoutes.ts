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
        return res.status(400).send(`<h2>Upload Error</h2><p>${err.message}</p>`);
      }
      if (err instanceof Error) {
        return res.status(400).send(`<h2>Upload Error</h2><p>${err.message}</p>`);
      }
      next();
    });
  },
  submitVehicle
);

export default router;
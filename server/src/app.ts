import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import vehicleRoutes from "./routes/vehicleRoutes";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
}));
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    message: "Server running"
  });
});

app.use("/api", vehicleRoutes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: "internal_server_error",
    message: "Something went wrong.",
  });
});

export default app;
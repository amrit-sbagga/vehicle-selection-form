import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import vehicleRoutes from "./routes/vehicleRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    message: "Server running"
  });
});

app.use("/api", vehicleRoutes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("<h2>Internal Server Error</h2><p>Something went wrong.</p>");
});

export default app;
import express from "express";
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

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
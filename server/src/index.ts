import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Server running" });
});

app.post(
  "/api/vehicle",
  upload.single("logbook"),
  (req, res) => {
    const { make, model, badge } = req.body;

    const fileContent = req.file
      ? req.file.buffer.toString("utf-8")
      : "";

    res.json({
      make,
      model,
      badge,
      logbook: fileContent
    });
  }
);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
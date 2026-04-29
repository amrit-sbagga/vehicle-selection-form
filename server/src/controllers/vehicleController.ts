import { Request, Response } from "express";
import { vehicleSchema } from "../validation/vehicleSchema";

export const submitVehicle = (
  req: Request,
  res: Response
) => {
  const result =
    vehicleSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).send(`
      <h2>Validation Error</h2>
      <pre>${JSON.stringify(
      result.error.flatten()
        .fieldErrors,
      null,
      2
    )}</pre>
    `);
  }

  const { make, model, badge } =
    result.data;

  const file = req.file;

  const logbook = file
    ? file.buffer.toString("utf-8")
    : "No logbook uploaded";

  return res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vehicle Response</title>

        <style>
          body {
            font-family: Arial, sans-serif;
            padding-right: 24px;
            padding-bottom: 16px;
            padding-left: 24px;
            line-height: 1.6;
          }

          h2 {
            margin-bottom: 20px;
          }

          .section {
            margin-bottom: 18px;
          }

          pre {
            background: #f5f5f5;
            padding: 16px;
            border-radius: 8px;
            white-space: pre-wrap;
            width: fit-content;
            max-width: 100%;
          }
        </style>
      </head>

      <body>
        <h2>Vehicle Details</h2>

        <div class="section">
          <strong>Make:</strong> ${make}
        </div>

        <div class="section">
          <strong>Model:</strong> ${model}
        </div>

        <div class="section">
          <strong>Badge:</strong> ${badge}
        </div>

        <h2>Logbook</h2>

        <pre>${logbook}</pre>
      </body>
    </html>
  `);
};
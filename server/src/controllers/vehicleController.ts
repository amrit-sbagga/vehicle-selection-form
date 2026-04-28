import { Request, Response } from "express";

export const submitVehicle = (
  req: Request,
  res: Response
) => {
  const { make, model, badge } = req.body;

  const file = req.file;

  const logbook = file
    ? file.buffer.toString("utf-8")
    : "";

  return res.json({
    make,
    model,
    badge,
    logbook
  });
};
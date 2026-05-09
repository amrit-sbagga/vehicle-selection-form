import multer, { FileFilterCallback } from "multer";
import type { Request } from "express";

type MulterFile = Parameters<NonNullable<multer.Options["fileFilter"]>>[1];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024, // 1 MB
    files: 1,
  },
  fileFilter: (_req: Request, file: MulterFile, cb: FileFilterCallback) => {
    if (file.mimetype === "text/plain") {
      cb(null, true);
    } else {
      cb(new Error("Only .txt files are allowed"));
    }
  },
});

export default upload;
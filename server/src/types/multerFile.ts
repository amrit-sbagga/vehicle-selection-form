import type multer from "multer";

/** Second argument to Multer's `fileFilter` callback. */
export type MulterFileFilterFile = Parameters<
  NonNullable<multer.Options["fileFilter"]>
>[1];

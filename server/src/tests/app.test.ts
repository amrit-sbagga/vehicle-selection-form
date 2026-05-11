import request from "supertest";
import app from "../app";
import { describe, it, expect } from "vitest";

describe("Server API", () => {
  it("GET / should return health response", async () => {
    const res = await request(app).get("/");

    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      message: "Server running"
    });
  });

  it("POST /api/upload should submit vehicle successfully", async () => {
    const res = await request(app)
      .post("/api/upload")
      .field("make", "BMW")
      .field("model", "130d")
      .field("badge", "xDrive 26d")
      .attach(
        "logbook",
        Buffer.from(
          "2024/01/01: Initial Service"
        ),
        "logbook.txt"
      );

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);

    expect(res.body).toMatchObject({
      make: "BMW",
      model: "130d",
      badge: "xDrive 26d",
      logbook: "2024/01/01: Initial Service"
    });
  });

  it("POST /api/upload should fail validation", async () => {
    const res = await request(app)
      .post("/api/upload")
      .field("make", "")
      .field("model", "130d")
      .field("badge", "xDrive 26d");

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      error: "validation_failed"
    });
    expect(res.body.fieldErrors).toBeDefined();
  });

  it("POST /api/upload succeeds without a file and uses placeholder logbook", async () => {
    const res = await request(app)
      .post("/api/upload")
      .field("make", "BMW")
      .field("model", "130d")
      .field("badge", "xDrive 26d");

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      make: "BMW",
      model: "130d",
      badge: "xDrive 26d",
      logbook: "No logbook uploaded",
    });
  });

  it("POST /api/upload rejects non-plain-text uploads", async () => {
    const res = await request(app)
      .post("/api/upload")
      .field("make", "BMW")
      .field("model", "130d")
      .field("badge", "xDrive 26d")
      .attach(
        "logbook",
        Buffer.from([0x89, 0x50, 0x4e, 0x47]),
        {
          filename: "image.png",
          contentType: "image/png",
        }
      );

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      error: "upload_failed",
    });
    expect(typeof res.body.message).toBe("string");
  });
});

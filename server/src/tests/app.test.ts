import request from "supertest";
import app from '../app';
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

    expect(res.text).toContain("BMW");
    expect(res.text).toContain("130d");
    expect(res.text).toContain("xDrive 26d");
    expect(res.text).toContain(
      "Initial Service"
    );
  });

  it("POST /api/upload should fail validation", async () => {
    const res = await request(app)
      .post("/api/upload")
      .field("make", "")
      .field("model", "130d")
      .field("badge", "xDrive 26d");

    expect(res.status).toBe(400);

    expect(res.text).toContain(
      "Validation Error"
    );
  });
});
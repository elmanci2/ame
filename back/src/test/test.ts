import { Request, Response } from "express";
import { add_service } from "../controllers/controllers2";
import { Errors } from "../errors/error";
import { Service } from "../db/models";

jest.mock("./src/db/models/index.ts");

describe("add_service", () => {
  it("should return 400 if user or data is missing", async () => {
    const req = { user: null, body: null };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    await add_service(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(Errors.internalError);
  });

  it("should create and save a new service", async () => {
    const req = {
      user: { user_id: 123 },
      body: {
        /* provide data for the service */
      },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mockCreate = jest
      .spyOn(Service, "create")
      .mockResolvedValueOnce({
        save: jest.fn().mockResolvedValueOnce(true),
      } as any);
    await add_service(req as Request, res as Response);
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({ user_id: 123 })
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true });
  });

  it("should return 500 if there is an error", async () => {
    const req = {
      user: { user_id: 123 },
      body: {
        /* provide data for the service */
      },
    };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    jest
      .spyOn(Service, "create")
      .mockRejectedValueOnce(new Error("Test error"));
    await add_service(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(Errors.internalError);
  });
});

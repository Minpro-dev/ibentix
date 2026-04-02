import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";

export const authController = {
  test: catchAsync(async (req: Request, res: Response) => {
    return res.status(200).json({
      message: "success",
    });
  }),
};

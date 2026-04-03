import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { authService } from "../services/auth.service";

export const authController = {
  signup: catchAsync(async (req: Request, res: Response) => {
    const user = await authService.registerUser(req.body, req?.file);

    return res.status(200).json({
      status: "Success",
      data: user,
    });
  }),

  login: catchAsync(async (req: Request, res: Response) => {
    const user = await authService.validateUser(req.body);

    return res.status(200).json({
      status: "Success",
      data: user,
    });
  }),
};

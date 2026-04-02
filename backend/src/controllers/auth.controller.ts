import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { authService } from "../services/auth.service";
import { uploadSingle } from "../utils/cloudinaryUploader";

export const authController = {
  signup: catchAsync(async (req: Request, res: Response) => {
    const user = await authService.registerUser(req.body, req?.file);

    return res.status(200).json({
      status: "success",
      data: user,
    });
  }),
};

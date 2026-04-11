import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { pointService } from "../services/point.service";

export const pointController = {
  getAllUserPoints: catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;

    const userPoints = await pointService.getAllUserPoints(userId);

    res.status(200).json({
      status: "success",
      message: "Get total user points successfull",
      points: userPoints,
    });
  }),
};

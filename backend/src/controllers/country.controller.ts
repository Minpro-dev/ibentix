import { Request, Response } from "express";
import { getAllCountriesService } from "../services/country.service";

export const getAllCountriesController = async (
  req: Request,
  res: Response,
) => {
  const data = await getAllCountriesService();
  res.status(200).json({
    status: "success",
    message: "Get all countries successful",
    data,
  });
};

import { Request, Response } from "express";
import { organizerService } from "../services/organizer.service";

export const organizerController = {
  createOrganizerProfile: async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;
    const name = req.body.name;

    const organizerProfile = await organizerService.createOrganizer(
      userId,
      name,
      req.file,
    );

    res.status(201).json({
      status: "successfull",
      message: "Organizer profile created successfull",
      data: organizerProfile,
    });
  },

  getAllOrganizerProfiles: (req: Request, res: Response) => {
    res.status(200).json({
      status: "successfull",
      message: "Get all orginizer successfull",
    });
  },
};

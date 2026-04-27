import { Request, Response } from "express";
import * as eventService from "../services/event.service";
import { catchAsync } from "../utils/catchAsync";
import { uploadCloudinary } from "../utils/uploadCloudinary";
import { AppError } from "../utils/AppError";
import { uploadSingle } from "../utils/cloudinaryUploader";

// 1. CREATE EVENT
export const createEvent = catchAsync(async (req: Request, res: Response) => {
  if (!req.user?.userId) {
    throw new AppError(401, "Unauthorized: User not found");
  }

  const userId = req.user.userId;

  let thumbnailUrl = "";

  if (req.file?.buffer) {
    try {
      thumbnailUrl = await uploadCloudinary(req.file.buffer, "events");
    } catch {
      throw new AppError(500, "Failed to upload thumbnail");
    }
  }

  if (!req.body.title) {
    throw new AppError(400, "Event title is required");
  }

  const payload = {
    ...req.body,
    thumbnailUrl: thumbnailUrl,

    isFree: String(req.body.isFree) === "true",
  };

  const result = await eventService.createEventService(payload, userId);

  res.status(201).json({
    status: "success",
    message: "Event created successfully",
    data: result,
  });
});

// 2. GET ALL EVENTS (WITH FILTER )
export const getAllEvents = catchAsync(async (req: Request, res: Response) => {
  const result = await eventService.getAllEventsService(req.query);

  res.status(200).json({
    status: "success",
    message: "Events retrieved successfully",
    data: result,
  });
});

// 3. GET EVENT DETAIL (by ID)
export const getEventDetail = catchAsync(
  async (req: Request, res: Response) => {
    const { eventId } = req.params;

    if (!eventId) {
      throw new AppError(400, "eventId is required");
    }

    const result = await eventService.getEventDetailService(eventId as string);

    if (!result) {
      throw new AppError(404, "Event is not found");
    }

    res.status(200).json({
      status: "success",
      data: result,
    });
  },
);

// 4. GET EVENT BY SLUG
export const getEventBySlug = catchAsync(
  async (req: Request, res: Response) => {
    const { slug } = req.params;

    if (!slug) {
      throw new AppError(400, "slug is required");
    }

    const result = await eventService.getEventBySlugService(slug as string);

    if (!result) {
      throw new AppError(404, "Event not found");
    }

    res.status(200).json({
      status: "success",
      data: result,
    });
  },
);

// 5. GET EVENTS BY ORGANIZER
export const getEventsByOrganizer = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as string;
    const eventDate = req.query.eventDate as string;
    const isFree = req.query.isFree as string;
    const city = req.query.city as string;

    const { events, totalData, totalPage } =
      await eventService.getEventsByOrganizerService(
        userId,
        page,
        limit,
        search,
        eventDate,
        isFree,
        city,
      );

    res.status(200).json({
      status: "success",
      data: { totalData, totalPage, events },
    });
  },
);

// 6. GET TRENDING EVENTS
export const getTrendingEvents = catchAsync(
  async (_req: Request, res: Response) => {
    const result = await eventService.getTrendingEventsService();

    res.status(200).json({
      status: "success",
      message: "Trending events retrieved",
      data: result,
    });
  },
);

// 7. UPDATE EVENT
export const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const eventId = req.params.eventId as string;

  if (!eventId) {
    throw new AppError(400, "eventId is required");
  }

  if (!req.user?.userId) {
    throw new AppError(401, "Unauthorized");
  }

  const userId = req.user.userId;
  let updateData: any = { ...req.body };

  // upload thumbnail
  if (req.file) {
    try {
      updateData.thumbnailUrl = await uploadSingle(req.file, "events");
    } catch {
      throw new AppError(400, "Failed to upload thumbnail");
    }
  }

  const updatedEvent = await eventService.updateEventService(
    eventId,
    updateData,
    userId,
  );

  res.status(201).json({
    status: "success",
    message: "Update event succesfull",
    data: updatedEvent,
  });
});

// 7. DELETE EVENT (SOFT DELETE)
export const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  const eventId = req.params.eventId as string;

  if (!eventId) {
    throw new AppError(400, "eventId is required");
  }

  if (!req.user?.userId) {
    throw new AppError(401, "Unauthorized");
  }

  const userId = req.user.userId;

  await eventService.deleteEventService(eventId, userId);

  res.status(200).json({
    status: "success",
    message: "Event deleted successfully",
  });
});

// get all attendees by event
export const getAllAttendeesByEventId = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;
    const eventId = req.params.eventId as string;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 15;

    const { totalData, totalPage, attendees } =
      await eventService.getAllAttendeesByEvent(eventId, userId, page, limit);

    res.status(200).json({
      status: "success",
      message: "Get all attendees successfull",
      data: { totalData, totalPage, attendees },
    });
  },
);

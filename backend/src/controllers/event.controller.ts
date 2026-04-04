import { Request, Response } from 'express';
import * as eventService from '../services/event.service';
import { catchAsync } from '../utils/catchAsync';
import { uploadCloudinary } from '../utils/uploadCloudinary';
import { AppError } from '../utils/AppError';

// 1. CREATE EVENT
export const createEvent = catchAsync(async (req: any, res: Response) => {
  if (!req.user?.id) {
    throw new AppError(401, 'Unauthorized: User not found');
  }

  const organizerId = req.user.id;
  let thumbnailUrl = '';

  if (req.file?.buffer) {
    try {
      const uploadResult = await uploadCloudinary(req.file.buffer, 'events');
      thumbnailUrl = uploadResult;
    } catch (error) {
      throw new AppError(500, 'Failed to upload thumbnail');
    }
  }

  // VALIDATION
  if (!req.body.title) {
    throw new AppError(400, 'Event title is required');
  }

  const availableSlot = parseInt(String(req.body.available_slot));
  const price = parseFloat(String(req.body.price));

  if (isNaN(availableSlot)) {
    throw new AppError(400, 'Invalid available_slot');
  }

  if (isNaN(price)) {
    throw new AppError(400, 'Invalid price');
  }

  const payload = {
    ...req.body,
    thumbnail_url: thumbnailUrl,
    available_slot: availableSlot,
    price: price,
    isFree: String(req.body.isFree) === 'true',
  };

  const result = await eventService.createEventService(payload, organizerId);

  res.status(201).json({
    status: 'success',
    message: 'Event created successfully',
    data: result,
  });
});


// 2. GET ALL EVENTS
export const getAllEvents = catchAsync(async (_req: Request, res: Response) => {
  const result = await eventService.getAllEventsService();

  res.status(200).json({
    status: 'success',
    data: result,
  });
});


// 3. GET EVENT DETAIL
export const getEventDetail = catchAsync(async (req: Request, res: Response) => {
  const { event_id } = req.params;

  if (!event_id) {
    throw new AppError(400, 'event_id is required');
  }

  const result = await eventService.getEventDetailService(event_id as string);

  if (!result) {
    throw new AppError(404, 'Event not found');
  }

  res.status(200).json({
    status: 'success',
    data: result,
  });
});


// 4. GET EVENTS BY ORGANIZER
export const getEventsByOrganizer = catchAsync(async (req: any, res: Response) => {
  if (!req.user?.id) {
    throw new AppError(401, 'Unauthorized');
  }

  const organizerId = req.user.id;
  const result = await eventService.getEventsByOrganizerService(organizerId);

  res.status(200).json({
    status: 'success',
    data: result,
  });
});


// 5. UPDATE EVENT
export const updateEvent = catchAsync(async (req: any, res: Response) => {
  const { event_id } = req.params;

  if (!event_id) {
    throw new AppError(400, 'event_id is required');
  }

  if (!req.user?.userId) {
    throw new AppError(401, 'Unauthorized');
  }

  const organizerId = req.user.userId;
  let updateData: any = { ...req.body };

  if (req.file?.buffer) {
    try {
      const uploadResult = await uploadCloudinary(req.file.buffer, 'events');
      updateData.thumbnail_url = uploadResult;
    } catch (error) {
      throw new AppError(500, 'Failed to upload thumbnail');
    }
  }

  if (req.body.available_slot) {
    const slot = parseInt(String(req.body.available_slot));
    if (isNaN(slot)) {
      throw new AppError(400, 'Invalid available_slot');
    }
    updateData.available_slot = slot;
  }

  if (req.body.price) {
    const price = parseFloat(String(req.body.price));
    if (isNaN(price)) {
      throw new AppError(400, 'Invalid price');
    }
    updateData.price = price;
  }

  if (req.body.isFree !== undefined) {
    updateData.isFree = String(req.body.isFree) === 'true';
  }

  const result = await eventService.updateEventService(
    event_id,
    updateData,
    organizerId
  );

  if (!result) {
    throw new AppError(404, 'Event not found or not authorized');
  }

  res.status(200).json({
    status: 'success',
    message: 'Event updated successfully',
    data: result,
  });
});
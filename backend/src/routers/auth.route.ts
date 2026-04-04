import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventDetail,
  getEventsByOrganizer,
  updateEvent,
} from '../controllers/event.controller';

import { authentication, authorization } from '../middleware/auth.middleware';
import { upload } from '../config/multer.config';
import { validate } from '../middleware/validate.middleware';
import { createEventSchema, updateEventSchema } from '../validations/event.validation';

const route = Router();

// --- ORGANIZER ---
route.get(
  '/organizer/me',
  authentication,
  authorization('ORGANIZER'),
  getEventsByOrganizer
);

route.get(
  '/organizer/:event_id',
  authentication,
  authorization('ORGANIZER'),
  getEventDetail
);

// --- ATTENDEE ---
route.get('/', getAllEvents);
route.get('/:event_id', getEventDetail);

// --- CREATE ---
route.post(
  '/',
  authentication,
  authorization('ORGANIZER'),
  upload.single('thumbnail'),
  validate(createEventSchema),
  createEvent
);

// --- UPDATE ---
route.patch(
  '/:event_id',
  authentication,
  authorization('ORGANIZER'),
  upload.single('thumbnail'),
  validate(updateEventSchema),
  updateEvent
);

export default route;
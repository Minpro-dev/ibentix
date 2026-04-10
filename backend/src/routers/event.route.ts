import { Router } from 'express';
import {
  createEvent,
  getAllEvents,
//   getEventDetail,
//   getEventBySlug,
//   getEventsByOrganizer,
//   getTrendingEvents,
//   updateEvent,
//   deleteEvent,
} from '../controllers/event.controller';

import { authentication } from '../middleware/auth.middleware';
import { upload } from '../config/multer.config';

// (pakai Zod)
import { validate } from '../middleware/validation.middleware';
import { createEventSchema, updateEventSchema, getEventsQuerySchema } 
from '../validations/event.validation';


const route = Router();


// =========================
// ATTENDEE ROUTES
// =========================

// GET all events (with filter + pagination)
route.get('/', validate(getEventsQuerySchema), getAllEvents);

// // GET trending events
// route.get('/trending', getTrendingEvents);

// // GET event detail by ID
// route.get('/:event_id', getEventDetail);

// // GET event detail by slug
// route.get('/slug/:slug', getEventBySlug);


// // =========================
// // ORGANIZER ROUTES
// // =========================

// // GET my events
// route.get('/organizer/me', authentication, getEventsByOrganizer);

// CREATE event
route.post(
  '/',
  authentication,
  upload.single('thumbnail'),
  validate(createEventSchema), // optional (Zod)
  createEvent
);

// // UPDATE event
// route.patch(
//   '/:event_id',
//   authentication,
//   upload.single('thumbnail'),
//   validate(updateEventSchema), // optional
//   updateEvent
// );

// // DELETE event
// route.delete(
//   '/:event_id',
//   authentication,
//   deleteEvent
// );

export default route;
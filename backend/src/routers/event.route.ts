import { Request, Response, Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventDetail,
  getEventsByOrganizer,
  updateEvent,
} from '../controllers/event.controller';

import { authentication } from '../middleware/auth.middleware';
import { upload } from '../config/multer.config';

const route = Router();

// --- ORGANIZER (protected) ---
route.get('/organizer/me', authentication, getEventsByOrganizer);
route.get('/organizer/:event_id', authentication, getEventDetail);

// --- PUBLIC ---
route.get('/', getAllEvents);
route.get('/:event_id', getEventDetail);

// --- CREATE ---
route.post('/', authentication, upload.single('thumbnail'), createEvent);

// --- UPDATE ---
route.post('/:event_id', authentication, upload.single('thumbnail'), updateEvent);

export default route;
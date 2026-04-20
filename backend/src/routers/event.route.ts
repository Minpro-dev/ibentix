import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventDetail,
  getEventBySlug,
  getTrendingEvents,
  updateEvent,
  deleteEvent,
  getEventsByOrganizer,
  getAllAttendeesByEventId,
} from "../controllers/event.controller";

import { authentication, authorization } from "../middleware/auth.middleware";
import { upload } from "../config/multer.config";

// (pakai Zod)
import { validate } from "../middleware/validation.middleware";
import {
  createEventSchema,
  updateEventSchema,
  getEventsQuerySchema,
} from "../schemas/event.validation";

const route = Router();

// =========================
// ATTENDEE ROUTES
// =========================

// GET all events (with filter + pagination)
route.get("/", validate(getEventsQuerySchema), getAllEvents);

// GET trending events
route.get("/trending", getTrendingEvents);

// GET event detail by ID
route.get("/details/:eventId", getEventDetail);

// GET event detail by slug
route.get("/slug/:slug", getEventBySlug);

// // =========================
// // ORGANIZER ROUTES
// // =========================

// GET my events
route.get("/organizer/me", authentication, getEventsByOrganizer);

// CREATE event
route.post(
  "/",
  authentication,
  upload.single("thumbnail"),
  validate(createEventSchema), // optional (Zod)
  createEvent,
);

// UPDATE event
route.patch(
  "/:eventId",
  authentication,
  upload.single("thumbnail"),
  validate(updateEventSchema), // optional
  updateEvent,
);

// DELETE event
route.delete("/:eventId", authentication, deleteEvent);

// get all attendees by event
route.get(
  "/event-attendees/:eventId",
  authentication,
  authorization("ORGANIZER"),
  getAllAttendeesByEventId,
);

export default route;

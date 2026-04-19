import * as Yup from "yup";
import { EventCategory } from "../../../../types/eventCategory";

export const createEventSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Title must be at least 5 characters")
    .required("Event title is required"),
  description: Yup.string()
    .min(20, "Description must be at least 20 characters")
    .required("Description is required"),
  availableSlot: Yup.number()
    .typeError("Must be a number")
    .min(1, "Minimum 1 slot")
    .required("Slots are required"),
  organizerId: Yup.string().required("Please select an organizer profile"),
  locationName: Yup.string().required("Location name is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  eventDate: Yup.date()
    .min(new Date(), "Event date cannot be in the past")
    .required("Event date is required"),
  startSellingDate: Yup.date()
    .max(Yup.ref("eventDate"), "Selling must start before the event date")
    .required("Start selling date is required"),
  endSellingDate: Yup.date()
    .min(Yup.ref("startSellingDate"), "End date must be after start date")
    .max(Yup.ref("eventDate"), "End date must be before the event starts")
    .required("End selling date is required"),
  isFree: Yup.boolean(),
  price: Yup.number().when("isFree", {
    is: false,
    then: (schema) =>
      schema.min(1000, "Min price is Rp 1.000").required("Price is required"),
    otherwise: (schema) => schema.nullable(),
  }),
  thumbnail: Yup.mixed()
    .test(
      "fileSize",
      "File too large",
      (value: any) => !value || (value && value.size <= 2000000),
    )
    .test(
      "fileFormat",
      "Unsupported format",
      (value: any) =>
        !value ||
        (value &&
          ["image/jpg", "image/png", "image/jpeg"].includes(value.type)),
    ),
  category: Yup.string()
    .oneOf(Object.values(EventCategory), "Invalid category selected")
    .required("Category is required"),
});

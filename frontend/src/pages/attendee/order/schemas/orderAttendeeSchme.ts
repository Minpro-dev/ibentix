import * as Yup from "yup";

export const orderAttendeeSchema = Yup.object().shape({
  attendees: Yup.array().of(
    Yup.object().shape({
      attendeeName: Yup.string()
        .min(3, "Name too short")
        .required("Full name is required"),
      attendeeEmail: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
  ),
});

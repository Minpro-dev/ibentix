import * as Yup from "yup";

export const createOrganizerProfileShema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Profile name must be at least 5 characters")
    .max(25, "Profile name only can have 25 characters")
    .required("Profile name is required"),

  image: Yup.mixed()
    .required("Image is required")
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
});

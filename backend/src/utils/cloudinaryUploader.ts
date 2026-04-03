import { AppError } from "./AppError";
import { uploadCloudinary } from "./uploadCloudinary";

export const uploadSingle = async (file: any) => {
  if (!file) {
    throw new AppError(400, "No file uploaded");
  }

  const url = await uploadCloudinary(file.buffer, "profile-avatar");

  return url;
};

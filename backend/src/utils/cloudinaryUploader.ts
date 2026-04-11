import { AppError } from "./AppError";
import { uploadCloudinary } from "./uploadCloudinary";

export const uploadSingle = async (file: any, folder: string) => {
  if (!file) {
    throw new AppError(400, "No file uploaded");
  }

  const url = await uploadCloudinary(file.buffer, folder);

  return url;
};

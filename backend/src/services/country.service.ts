import { prisma } from "../config/prismaClient.config";

export const getAllCountriesService = async () => {
  const countries = await prisma.country.findMany();
  return countries;
};

import { Router } from "express";
import { getAllCountriesController } from "../controllers/country.controller";

const route = Router();

route.get("/", getAllCountriesController);

export default route;

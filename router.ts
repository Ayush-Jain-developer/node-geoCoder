import express from "express";
import { Places } from "./places";

export const router = express.Router();

router.post("/addLocation", Places.createLocation);
router.get("/nearLocation/:address", Places.nearLocation);

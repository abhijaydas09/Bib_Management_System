import express from "express";
import { createEvent, getMyEvents } from "../controller/event.controller.js";
import { verifyOrganiser } from "../middleware/verifyOrganiser.js";

const router = express.Router();

// Organiser creates an event
router.post("/create", verifyOrganiser, createEvent);

// Get all events created by logged-in organiser
router.get("/my_events", verifyOrganiser, getMyEvents);

export default router;

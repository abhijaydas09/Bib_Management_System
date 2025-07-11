import Event from "../model/Event.js";

export const createEvent = async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      organiser: req.organiser._id  // pulled from JWT by middleware
    };
    const newEvent = new Event(eventData);
    await newEvent.save();

    res.status(201).json({
      message: "Event created successfully",
      event: newEvent
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ organiser: req.organiser._id });
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to fetch events" });
  }
};

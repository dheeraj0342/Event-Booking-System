const { Event } = require("../models");

exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      dateTime,
      location,
      totalSeats,
      availableSeats,
    } = req.body;
    const event = await Event.create({
      title,
      description,
      dateTime,
      location,
      totalSeats,
      availableSeats,
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      dateTime,
      location,
      totalSeats,
      availableSeats,
    } = req.body;
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    await event.update({
      title,
      description,
      dateTime,
      location,
      totalSeats,
      availableSeats,
    });
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    await event.destroy();
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

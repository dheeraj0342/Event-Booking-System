const { Booking, Event } = require("../models");

exports.bookTicket = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.id;

    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (event.availableSeats <= 0) {
      return res.status(400).json({ error: "No seats available" });
    }

    const booking = await Booking.create({ userId, eventId });
    await event.update({ availableSeats: event.availableSeats - 1 });

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id; 
    const bookings = await Booking.findAll({
      where: { userId },
      include: [Event],
    });
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; 

    const booking = await Booking.findOne({ where: { id, userId } });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    const event = await Event.findByPk(booking.eventId);
    await event.update({ availableSeats: event.availableSeats + 1 });
    await booking.destroy();
    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

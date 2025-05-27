const User = require("./User");
const Event = require("./Event");
const Booking = require("./Booking");

User.hasMany(Booking);
Booking.belongsTo(User);

Event.hasMany(Booking);
Booking.belongsTo(Event);

module.exports = {
  User,
  Event,
  Booking,
};

const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.get("/", eventController.getAllEvents);

router.post("/", authMiddleware, roleMiddleware, eventController.createEvent);
router.put("/:id", authMiddleware, roleMiddleware, eventController.updateEvent);
router.delete("/:id",authMiddleware,roleMiddleware,eventController.deleteEvent);

module.exports = router;

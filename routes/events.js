const express = require('express');
const router = express.Router();

const eventsController = require('../controllers/eventsController');
const isAuth = require("../middlewares/is-auth");

router.get("/events", isAuth,  eventsController.getEvents);
router.get("/add-events", isAuth,  eventsController.getAddEvent);
router.post("/add-events", isAuth,  eventsController.postAddEvent);
module.exports = router;
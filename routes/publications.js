const express = require('express');

const router = express.Router();

const homeController = require('../controllers/publicationController');
const isAuth = require("../middlewares/is-auth");

router.get("/publications", isAuth,  homeController.gethome);

module.exports = router;
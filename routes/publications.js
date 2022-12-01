const express = require('express');

const router = express.Router();

const homeController = require('../controllers/publicationController');

router.get("/publications",homeController.gethome);

module.exports = router;
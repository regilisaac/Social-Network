const express = require('express');

const router = express.Router();

const loginController = require('../controllers/LoginController');

router.get("/",loginController.GetLogin);
router.get("/create-usuario", loginController.GetCreateUsuarios);
router.post("/create-usuario", loginController.PostCreateUsuarios);
router.get("/login",loginController.GetLogin);
router.post("/login",loginController.PostLogin);


module.exports = router;
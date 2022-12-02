const express = require('express');

const router = express.Router();

const loginController = require('../controllers/LoginController');
const isAuth = require("../middlewares/is-auth");

router.get("/",loginController.GetLogin);
router.get("/logout", isAuth,  loginController.getLogout);
router.get("/create-usuario", loginController.GetCreateUsuarios);
router.post("/create-usuario", loginController.PostCreateUsuarios);
router.get("/login",loginController.GetLogin);
router.post("/login",loginController.PostLogin);


module.exports = router;
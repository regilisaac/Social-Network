const express = require('express');


const router = express.Router();

const friendsController = require('../controllers/FriendsController');
const isAuth = require("../middlewares/is-auth");

router.get("/friends", isAuth,  friendsController.getFriends);
router.post("/agg-friends:userdID", isAuth, friendsController.PostFriend);

module.exports = router;
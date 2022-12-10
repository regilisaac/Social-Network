const express = require('express');


const router = express.Router();

const friendsController = require('../controllers/FriendsController');
const isAuth = require("../middlewares/is-auth");

router.get("/friends", isAuth,  friendsController.getFriends);
//router.post("/agg-friends", isAuth, friendsController.PostFriend);
router.get('/searchNewFriendHome/:userID',isAuth, friendsController.searchNewFriendHome);
router.post('/searchNewFriend', friendsController.searchNewFriend);


module.exports = router;
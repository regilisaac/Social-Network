const users = require("../models/users");
const Sequelize = require("sequelize");
const Friend = require("../models/friends");
const Publicacion = require("../models/publications")
const comentary = require("../models/comentaries");
const Reply = require("../models/replys");
const Usuarios = require("../models/users");
const { Op } =require("sequelize");
const notiCount = require("../util/countNotifications");


exports.getFriends = (req, res, next) => {
  const userId = req.session.userdata;
  Publicacion.findAll({include:[{model: comentary, include: Reply}]}).then((result) =>{
    const publicacion = result.map((result) => result.dataValues);
     Reply.findAll().then((result2) =>{
        const reply = result2.map((result2) => result2.dataValues);   
        Usuarios.findAll().then((result3) =>{
          const user = result3.map((result3) => result3.dataValues);   
          Friend.findAll({where: {FriendId: userId.id, estado: "0"}}).then((result4) =>{
            const friend = result4.map((result4) => result4.dataValues); 
            Friend.findAll().then((result5) =>{
              const friends = result5.map((result5) => result5.dataValues);
                res.render("friends/friend", { 
                  pageTitle: "Friends",
                  friendsActive: true,
                  publicacion: publicacion,
                  repuesta: reply,
                  users: user,
                  friends: friends,
                  notofications: friend.length,
                  hasPublicacion: publicacion.length > 0,
                  });
                }).catch(err=>{
                  console.log(err);
                  return res.redirect("/");
                });
                }).catch(err=>{
                  console.log(err);
                  return res.redirect("/");
                });
              }).catch(err=>{
                console.log(err);
                return res.redirect("/friends");
            }).catch(err=>{
              console.log(err);
              return res.redirect("/friends");
            });
          }).catch(err=>{
            console.log(err);
            return res.redirect("/friends");
          });
    }).catch(err=>{
      console.log(err);
      return res.redirect("/friends");
    });
};

exports.getfoundFriend = (req, res, next) => {
    
            res.render("friends/founduser", { 
              pageTitle: "Buscar Amigos",
              friendsActive: true,
              });
};

exports.getfoundedFriend = (req, res, next) => {
  const user = req.body.user;
  Usuarios.findAll({ where: { usuario: { [Op.like]: `${user+'%'}` } }}).then((result) =>{
    const user = result.map((result) => result.dataValues);
      res.render("friends/founduser", { 
        pageTitle: "Buscar Amigos",
        friendsActive: true,
        foundedFriend: true,
        users: user,
        });
  }).catch(err=>{
    console.log(err);
    return res.redirect("/friends");
  });

};

exports.postAddFriend = (req, res, next) => {
  const friendId = req.body.friendId;
  const userId = req.body.userId;
 console.log(friendId);
 console.log(userId);
  if(!friendId){
    
    return res.redirect("/friends");
  }
  if(!userId){
    
    return res.redirect("/friends");
  }

  Friend.create({usuarioId: userId, FriendId: friendId, estado: 0} ).then(result=>{
    
    return res.redirect("/friends");
   
 }).catch(err=>{
   console.log(err);
   return res.redirect("/friends");
 });
   
};

exports.postDeleteFriend = (req, res, next) => {
    
  const friendId = req.body.friendId;
  const userId = req.body.userId;
  const frId = req.body.frId;


  Friend.destroy({where: {id: friendId}}).then((result) => {
    Friend.destroy({where: {usuarioId: frId ,FriendId: userId}}).then((result) => {
      res.redirect("/friends");
  }).catch((err) => {
      console.log(err);
  });
  }).catch((err) => {
      console.log(err);
  });
};

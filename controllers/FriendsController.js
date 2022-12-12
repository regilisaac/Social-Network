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
  Publicacion.findAll({include:[{model: comentary, include: Reply}], order: [["createdAt", "DESC"]]}).then((result) =>{
    const publicacion = result.map((result) => result.dataValues);
     Reply.findAll().then((result2) =>{
        const reply = result2.map((result2) => result2.dataValues);   
        Usuarios.findAll({order: [["createdAt", "DESC"]]}).then((result3) =>{
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
  const userId = req.session.userdata;
  Friend.findAll({where: {FriendId: userId.id, estado: "0"}}).then((result4) =>{
    const friend = result4.map((result4) => result4.dataValues); 
            res.render("friends/founduser", { 
              pageTitle: "Buscar Amigos",
              friendsActive: true,
              foundedFriend: true,
              notofications: friend.length,
              });
            }).catch(err=>{
              console.log(err);
              return res.redirect("/friends");
          })
};

exports.getfoundedFriend = (req, res, next) => {
  const userio = req.body.user;
  const userId = req.session.userdata;
  Usuarios.findAll({ where: { usuario: { [Op.like]: `${userio+'%'}` } }}).then((result) =>{
    const user = result.map((result) => result.dataValues);
    Friend.findAll({where: {FriendId: userId.id, estado: "0"}}).then((result4) =>{
      const friend = result4.map((result4) => result4.dataValues); 
      Friend.findAll().then((result5) =>{
        const friends = result5.map((result5) => result5.dataValues);
          res.render("friends/founduser", { 
            pageTitle: "Buscar Amigos",
            friendsActive: true,
            foundedFriend: user.length > 0,
            users: user,
            notofications: friend.length,
            friends: friends,
            });
          }).catch(err=>{
            console.log(err);
            return res.redirect("/");
          });
      }).catch(err=>{
        console.log(err);
        return res.redirect("/friends");
    })
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

     Friend.findOne({where: {usuarioId: userId, FriendId: friendId}}).then((result1) => {
      if( result1 == null){
        

          Friend.create({usuarioId: userId, FriendId: friendId, estado: 0} ).then(result=>{
            return res.redirect("/friends");
            
  
          }).catch(err=>{
            console.log(err);
            return res.redirect("/friends");
          });
        }
        else{
          
          const friend1 = result1.dataValues;
       
        if(friend1.estado == 1){
          
        req.flash("errors","Ya son amigos")
        return res.redirect("/friends");
            
        } 
        if(friend1.estado == 0){
          
          req.flash("errors","Ya se envio una solicitud")
          return res.redirect("/friends");
              
          } 

          if(friend1.estado == 2){
          
            Friend.create({usuarioId: userId, FriendId: friendId, estado: 0} ).then(result=>{
              return res.redirect("/friends");
              
    
            }).catch(err=>{
              console.log(err);
              return res.redirect("/friends");
            });
                
            } 
        }

        
        
 }).catch(err=>{
   console.log(err);
   console.log("uuu");
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

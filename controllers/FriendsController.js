const users = require("../models/users");
const Sequelize = require("sequelize");
const friend = require("../models/friends");
const Publicacion = require("../models/publications")
const comentary = require("../models/comentaries");
const Reply = require("../models/replys");
const Usuarios = require("../models/users");
const { Op } =require("sequelize");
const notiCount = require("../util/countNotifications");


exports.getFriends = (req, res, next) => {

  Publicacion.findAll({include:[{model: comentary, include: Reply}]}).then((result) =>{
    const publicacion = result.map((result) => result.dataValues);
     Reply.findAll().then((result2) =>{
        const reply = result2.map((result2) => result2.dataValues);   
        Usuarios.findAll().then((result3) =>{
          const user = result3.map((result3) => result3.dataValues);   
    
            res.render("friends/friend", { 
              pageTitle: "Friends",
              friendsActive: true,
              publicacion: publicacion,
              repuesta: reply,
              users: user,
              hasPublicacion: publicacion.length > 0,
              });
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

  module.exports.searchNewFriendHome = (req, res, next) => {

    users.findOne({ where: { id: userId} }).then(async (f) => {
      const currentlyUser = f.dataValues;
  
      res.render("friends/friend", {
        pageTitle: "Search new Friend",
        userId: req.user.id,
        user: currentlyUser,
        nCount1: await notiCount.countNotifications(userId),
      });
  
    }).catch((err) => console.log(err));
  };
  
  module.exports.searchNewFriend = (req, res, next) => {
    const userId = req.body.userId;
    let noMoreUno;
    //user
    users.findAll({
      where: {
        [Op.or]: 
        [
          { name: { [Op.like]: req.body.userName } },
          { usuario: { [Op.like]: req.body.userName } },
          { lastname: { [Op.like]: req.body.userName } }
        ],
        [Op.and]: [{ estado: 1 }]
      }})
    .then((nf) => nf.map((nf) => nf.dataValues))
    .then((nf) => nf.filter((nf) => nf.id != userId))
    .then((us) =>{
  
        const userF = us.map((uf) => uf.id);
        const userFriends = us;
  
        console.log('\n\n\n\n\n\n userF',userF,'\n\n\n\n\n\n');
        console.log('\n\n\n\n\n\n',userFriends,userFriends,'\n\n\n\n\n\n');

        friend.create({isAccepted: false, senderID: userId, receptorID: userF});

        console.log("Envia: " +userId + "Recibe: "+ userF);
  
        friend.findAll({where: {[Op.or]: [{ [Op.and]: [{ senderID: userId }, { receptorID: userF }] },{ [Op.and]: [{ senderID: userF }, { receptorID: userId }]}]}})
        .then((f) => f.map((fr) => {
  
          !fr.dataValues.isAccepted? noMoreUno = true : noMoreUno;//mas de una solicitud de amistad
          return fr.dataValues.isAccepted // si ya es amigo o no
        }))
        .then(async (ac) => {
          users.findOne({ where: { id: userId } }).then(async (f) => {
            const currentlyUser = f.dataValues;
  
            res.render("friends/friend", {
              pageTitle: "Search new Friend",
              userId: userId,
              user: currentlyUser,
              ac,
              usLength: userFriends.length <= 0 ? true : false,
              us: userFriends,
              nCount1: await notiCount.countNotifications(userId),
              noMoreUno
            });
  
          }).catch((err) => console.log(err));
        }).catch((err) => console.log(err));
      }).catch((err) => console.log(err));
  };
  
  
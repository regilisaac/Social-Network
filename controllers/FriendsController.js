const users = require("../models/users");
const Sequelize = require("sequelize");

const Publicacion = require("../models/publications");

exports.getFriends = (req, res, next) => {

    Publicacion.findAll({order: [['date','DESC']]}).then((result) =>{

        let usuarios=[];
      users.findAll().then(result1 =>{
      
         result1.map((result1) => usuarios.push(result1.dataValues) );
    
      })
      .catch((err) => {
          console.log(err);
        });

      const publicacion = result.map((result) => result.dataValues);
      
      res.render("friends/friend", { 
        pageTitle: "Friends",
        friendsActive: true,
        publicacion: publicacion,
        usuarios: usuarios,
        hasPublicacion: publicacion.length  <0,
        });
    })
  };

  exports.PostFriend = (res, req, next) =>{

    amigo = req.body.AggAmigo;
    let username;

    users.findAll({
        where: {
            usuario: AggAmigo
          
        }
      }).then(result1 =>{
      
        result1.map((result1) => usuarios.push(result1.dataValues) );
   
     }) 
     .catch((err) => {
         console.log(err);
       });
    

  }
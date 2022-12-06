const users = require("../models/users");
const Sequelize = require("sequelize");
const Publicacion = require("../models/publications")

  exports.gethome = (req, res, next) => {

    Publicacion.findAll().then((result) =>{
      const publicacion = result.map((result) => result.dataValues);
      
      res.render("home/index", { 
        pageTitle: "Home",
        homeActive: true,
        publicacion: publicacion,
        hasPublicacion: publicacion.length  <0,
        });
    })
    

      

     
  };

  exports.PostHome = (req, res, next) => {

  const description = req.body.Publicacion;
  const img = req.file;
  const userId = req.params.userId;
  const date = new Date().getTime();
  const fecha = new Date(date).toDateString();
  console.log(userId);

  
  Publicacion.create({description: description, img:  "/" + img.path, usuarioId: userId, date: fecha} ).then(result=>{
    
    return res.redirect("/");
   
 }).catch(err=>{
   console.log(err);
   return res.redirect("/");
 });
  


   
};

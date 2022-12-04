const users = require("../models/users");
const Sequelize = require("sequelize");
const Publicacion = require("../models/publication")

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
  const imgPublication = req.file;

  Publicacion.create({description: description, imgPublication: imgPublication} ).then(result=>{
    
    return res.redirect("/");
 }).catch(err=>{
   console.log(err);
   return res.redirect("/");
 });


   
};


const users = require("../models/users");
const Sequelize = require("sequelize");

const Publicacion = require("../models/publications")

  exports.gethome = (req, res, next) => {

    Publicacion.findAll({order: [['date','DESC']]}).then((result) =>{
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
  const fecha = new Date(date).toUTCString();
  
  if(!img && !description){
    req.flash("errors","Debe ingresar una descripción o una imagen");
    return res.redirect("/");   
  }

  const imagePath = img ? "/" + img.path :  "";

  Publicacion.create({description: description, img: imagePath, usuarioId: userId, date: fecha} ).then(result=>{
    
    return res.redirect("/");
   
 }).catch(err=>{
   console.log(err);
   return res.redirect("/");
 });
   
};

exports.getEditPublication = (req, res, next) => {
    const edit = req.query.edit;
    const publiId = req.params.publiId;


  Publicacion.findAll().then((result) =>{
    const publicacion = result.map((result) => result.dataValues);

    Publicacion.findOne({where: {id: publiId}}).then((result) => {
      const publi = result.dataValues;
        if(!publi){
            req.flash("errors","No se ha encontrado la publicación");
            return res.redirect("/");
        }
          res.render("home/index", { 
            pageTitle: "Home",
            homeActive: true,
            publicacion: publicacion,
            publi: publi,
            editMode: edit,
            hasPublicacion: publicacion.length  <0,
            });    
          }).catch((err) => { 
            console.log(err);
             });
  
    }).catch((err) => { 
    console.log(err);
     });

};

exports.postEditPublication = (req, res, next) => {

  const description = req.body.Publicacion;
  const img = req.file;
  const publiId = req.body.publiId;
  const elm = req.body.elmimg;
   

  Publicacion.findOne({where: {id: publiId}}).then((result) => {
    const publi = result.dataValues;
    if(!publi){
      req.flash("errors","No se ha encontrado la publicación");
      return res.redirect("/");
    }
    let imagePath = publi.img;

    if (!img && !imagePath) {
     
    } else {
      imagePath = img ? "/" + img.path : publi.img;
    } 
    
    
    if(elm){
      imagePath = "";
    }

    if(!imagePath && !description){
      req.flash("errors","Debe ingresar una descripción o una imagen");
      return res.redirect("/");   
    }
  
    Publicacion.update({description: description, img: imagePath}, {where: {id: publiId}})
    .then((result) => {
          return res.redirect("/");
        }).catch(err=>{
          console.log(err);
          return res.redirect("/");
        });
        
  }).catch(err=>{
    console.log(err);
    return res.redirect("/");
  });
   
};

exports.postDeletePublication = (req, res, next) => {
    
  const publiId = req.body.publiId;

  Publicacion.destroy({where: {id: publiId}}).then((result) => {
      res.redirect("/");
  }).catch((err) => {
      console.log(err);
  });
};
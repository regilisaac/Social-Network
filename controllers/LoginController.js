const Usuarios = require("../models/users");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require("bcryptjs");
let isLoggedIn = false;

exports.GetLogin = (req, res, next) => {


    res.render("login/login", { 
    pageTitle: "Login",
    loginActive: true,

    });
    
  };
  exports.getLogout = (req, res, next) => {

      req.session.destroy((err) => {
      console.log(err);
      res.redirect("/");
    });
   
   };
  
  exports.GetCreateUsuarios = (req, res, next) => {
    res.render("login/login", { 
    pageTitle: "Registro",
    loginActive: true,
    });
};

exports.PostLogin = (req, res, next) => {
  
  const Logusuario = req.body.LogUsuario;
  const contrasena = req.body.Contrasena;

    Usuarios.findOne({where: {usuario: Logusuario}})
    .then(user =>{
     if(!user){
      req.flash("errors","Usuario incorrecto");
      return res.redirect("/");
     }

     bcrypt.compare(contrasena, user.contrasena).then(result => {
      if(result) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.userdata = user.dataValues;
        return req.session.save(err => {
          console.log(err);
          res.redirect("/publications");
        });
      }
      req.flash("errors","Contraseña incorrecta");
      res.redirect("/");
     }).catch(err=>{
      console.log(err);
      req.flash("errors","Ha ocurrido un error, contacte con el administrador");
      return res.redirect("/");
    });
    }).catch(err=>{
    console.log(err);
    return res.redirect("/");
  });
};


exports.PostCreateUsuarios = (req, res, next) => {
  const name = req.body.Nombre;
  const img = req.file;
  const correo = req.body.Correo;
  const usuario = req.body.Usuario;
  const contrasena = req.body.Contrasena;
  const confirmPassword = req.body.Ccontrasena;

  if(contrasena !== confirmPassword){
    req.flash("errors","Las contraseñas no coinciden");
    return res.redirect("/");
  }

  Usuarios.findOne({where: {usuario: usuario}}).then(user=>{
    if(user){
      req.flash("errors","El usuario ya existe");
      return res.redirect("/");
    }
  }).catch(err=>{
    console.log(err);
    return res.redirect("/");
  })

  Usuarios.findOne({where: {correo: correo}}).then(user=>{
    if(user){
      req.flash("errors","Ya existe un usuario con ese correo");n
      return res.redirect("/");
    }
  }).catch(err=>{
    console.log(err);
    return res.redirect("/");
  })

  bcrypt.hash(contrasena,12).then(hasedPassword =>{
  
    Usuarios.create({name: name,img: "/"+ img.path, correo: correo,usuario: usuario, contrasena: hasedPassword}).then(result=>{
    
      res.redirect("/");
   }).catch(err=>{
     console.log(err);
   });

  }).catch(err=>{
    console.log(err);
  });


};

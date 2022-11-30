const Usuarios = require("../models/Registro");
const bcrypt = require("bcryptjs");

exports.GetLogin = (req, res, next) => {


    res.render("login/login", { 
    pageTitle: "Login",
    loginActive: true,

    });
    
  };

  exports.GetCreateUsuarios = (req, res, next) => {
    res.render("login/login", { 
    pageTitle: "Registro",
    loginActive: true,
    });
};

exports.PostLogin = (req, res, next) => {
    //req.session.isLoggedIn = true;
    //res.redirect("/home");
  const Logusuario = req.body.LogUsuario;
  const contrasena = req.body.Contrasena;

    Usuarios.findOne({where: {usuario: Logusuario}}).then(user =>{
     if(!user){
      return res.redirect("/");
     }

     bcrypt
     .compare(contrasena, user.contrasena)
     .then(function(result) {
      if(result){
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save(err =>{
          console.log(err);
          res.redirect("/home");
        })
      }

      res.redirect("/");

     })
    }).catch(err=>{
    console.log(err);
    return res.redirect("/");
  })
};


exports.PostCreateUsuarios = (req, res, next) => {
  const name = req.body.Nombre;
  const img = req.file;
  const correo = req.body.Correo;
  const usuario = req.body.Usuario;
  const contrasena = req.body.Contrasena;
  const confirmPassword = req.body.Ccontrasena;

  if(contrasena !== confirmPassword){
    return res.redirect("/");
  }

  Usuarios.findOne({where: {usuario: usuario}}).then(user=>{
    if(user){
      return res.redirect("/");
    }
  }).catch(err=>{
    console.log(err);
    return res.redirect("/");
  })

  Usuarios.findOne({where: {correo: correo}}).then(user=>{
    if(user){
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


}
const Usuarios = require("../models/users");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require("bcryptjs");
const transporter = require("../services/emailService");
let isLoggedIn = false;

exports.getLogin = (req, res, next) => {
  if (!req.session.isLoggedIn) {
      res.render("login/login",
      {pageTitle: "Login", 
      loginActive: true,
        });
  } else {
      req.flash("errors","Para proseguir debe cerrar la sesión actual")
      res.redirect("/");
  }
  };

  exports.getForgot = (req, res, next) => {
    if (!req.session.isLoggedIn) {
      res.render("login/forgot",
      {pageTitle: "Forgot Password",
      loginActive: true,
      });
    } else {
      req.flash("errors","Para proseguir debe cerrar la sesión actual")
      res.redirect("/");
     }
    
  };

  exports.getLogout = (req, res, next) => {
      req.session.destroy((err) => {
      console.log(err);
      res.redirect("/login");
    });
   
   };
   exports.posForgot = (req, res, next) => {
  
    const user = req.body.user;

      Usuarios.findOne({where: {usuario: user}})
      .then(users =>{
       if(!users){
        req.flash("errors","Usuario incorrecto");
        return res.redirect("/forgot");
       }
        const user = users.dataValues;   
         const newpass = generateP();
         bcrypt.hash(newpass,12).then(hasedPassword =>{
         Usuarios.update({contrasena: hasedPassword}, {where: {id: user.id}})
         .then((result) => {
          res.redirect("/login");
          return transporter.sendMail({
            from: "Social Network notification",
            to: user.correo,
            subject: `restabler contraceña de ${user.usuario}`,
            html: "<strong> Su nueva contraceña </strong> <br><br> <p> Su nueva contraseña es: <strong> "+newpass+" </strong>. Gracias por ser parte de Social Network</p>"
            },
              (err3) => {
                  console.log(err3);
              });
          }).catch(err=>{
            console.log(err);
          });
         }).catch((err) => {
             console.log(err);
         }); 

      }).catch(err=>{
        console.log(err);
        return res.redirect("/forgot");
      });
    };
  
  exports.getSignup = (req, res, next) => {
    if (!req.session.isLoggedIn) {
    res.render("login/signup", { 
    pageTitle: "Registro",
    loginActive: true,
    });
  } else {
    req.flash("errors","Para proseguir debe cerrar la sesión actual")
    res.redirect("/");
  }
};

exports.PostLogin = (req, res, next) => {
  
  const user = req.body.user;
  const contrasena = req.body.password;

    Usuarios.findOne({where: {usuario: user}})
    .then(user =>{
     if(!user){
      req.flash("errors","Usuario incorrecto");
      return res.redirect("/login");
     }

     bcrypt.compare(contrasena, user.contrasena).then(result => {
      if(result) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.userdata = user.dataValues;
        return req.session.save(err => {
          console.log(err);
          res.redirect("/");
        });
      }
      req.flash("errors","Contraseña incorrecta");
      res.redirect("/login");
     }).catch(err=>{
      console.log(err);
      req.flash("errors","Ha ocurrido un error, contacte con el administrador");
      return res.redirect("/login");
    });
    }).catch(err=>{
    console.log(err);
    return res.redirect("/login");
  });
};


exports.PostSignup = (req, res, next) => {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const phone = req.body.phone;
  const img = req.file;
  const correo = req.body.email;
  const usuario = req.body.user;
  const contrasena = req.body.password;
  const confirmPassword = req.body.confirmpassword;

  if(contrasena !== confirmPassword){
    req.flash("errors","Las contraseñas no coinciden");
    return res.redirect("/signup");
  }

  Usuarios.findOne({where: {usuario: usuario}}).then(user=>{
    if(user){
      req.flash("errors","El usuario ya existe");
      return res.redirect("/signup");
    }
  }).catch(err=>{
    console.log(err);
    return res.redirect("/signup");
  })

  Usuarios.findOne({where: {correo: correo}}).then(user=>{
    if(user){
      req.flash("errors","Ya existe un usuario con ese correo");n
      return res.redirect("/signup");
    }
  }).catch(err=>{
    console.log(err);
    return res.redirect("/signup");
  })

  bcrypt.hash(contrasena,12).then(hasedPassword =>{

    if(!img){
      return res.redirect("/signup");
  }
  
    Usuarios.create({name: name, img: "/" + img.path, correo: correo , lastname: lastname,phone: phone,usuario: usuario, contrasena: hasedPassword}).then(result=>{
    
      return res.redirect("/login");
   }).catch(err=>{
     console.log(err);
     return res.redirect("/signup");
   });

  }).catch(err=>{
    console.log(err);
    return res.redirect("/signup");
  });


};
;
        function generateP() {
            var pass = '';
            var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
                    'abcdefghijklmnopqrstuvwxyz0123456789@#$';
              
            for (i = 1; i <= 8; i++) {
                var char = Math.floor(Math.random()
                            * str.length + 1);
                  
                pass += str.charAt(char)
            }
              
            return pass;
        }

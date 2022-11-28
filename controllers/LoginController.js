exports.GetLogin = (req, res, next) => {

    res.render("login/login", { 
    pageTitle: "Login",
    loginActive: true,
    });
    
  };
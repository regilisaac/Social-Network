
  exports.gethome = (req, res, next) => {
    res.render("home/index", { 
    pageTitle: "Home",
    homeActive: true
    });
  };

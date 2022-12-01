exports.GetHome = (req, res, next) => {
    res.render("home/index", { 
    pageTitle: "Home",
    homeActive: true,
    });
    //uwu
  };
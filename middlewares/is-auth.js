module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        req.flash("errors","No tiene permisos para acceder a esta página");
        return res.redirect("/");
    }
    next();
}
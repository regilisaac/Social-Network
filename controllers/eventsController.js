
const Friends = require("../models/friends");
const Events =require("../models/events");
const DEvents =require("../models/detailsEvents");

exports.getEvents = (req, res, next) => {
  const userId = req.session.userdata;
  Friends.findAll({where: {FriendId: userId.id, estado: "0"}}).then((result4) =>{
    const friend = result4.map((result4) => result4.dataValues);  
      res.render("events/events", { 
      pageTitle: "Eventos",
      eventActive: true,  
      notofications: friend.length,
      });
    }).catch(err=>{
      console.log(err);
      return res.redirect("/");
    });
              
};

exports.getAddEvent = (req, res, next) => {

  const userId = req.session.userdata;
  Friends.findAll({where: {FriendId: userId.id, estado: "0"}}).then((result) =>{
    const friend = result.map((result) => result.dataValues);
      res.render("events/add-events",
      {pageTitle: "Agregar-Evento",
      dateTime: new Date(new Date().getTime() + 86409000).toISOString().slice(0, 16),  
      eventActive: true,
      notofications: friend.length,
      });
  }).catch(err=>{
    console.log(err);
    return res.redirect("/");
  });

};

exports.postAddEvent = (req, res, next) => {
  const name = req.body.name;
  const date = req.body.date;
  const place = req.body.place;
  const userId = req.body.userId;


  if (name == "" || date == "" || place == "") {
    req.flash("errors","Todos los campos son obligatorios");
    return res.redirect("/add-events");
  }

    Events.create({name: name, date: date, place:place, usuarioId: userId }).then((result) => {
       res.redirect("/events");
      }).catch((err) => { 
          console.log(err);
      } );

  
};
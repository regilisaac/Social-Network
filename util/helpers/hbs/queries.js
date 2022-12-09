const Sequelize = require("sequelize");
const Reply = require("../../../models/replys");

exports.foundReply = (a) => {
  Reply.findAll().then((result2) =>{
      const reply = result2.map((result2) => result2.dataValues);   
      console.log(reply);
      
      reply.forEach(function(reply) {
        if (reply === a) {
          return true;
        }else{
            return false;
        }
    })
        

        }).catch(err=>{
          console.log(err);
          return res.redirect("/");
        });
};
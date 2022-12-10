const moment = require("moment");
moment.locale("es-do");



exports.GetEventDate = (date) => {
  const time = moment(date).format("LLLL");

  if (Date.parse(date) < Date.parse(moment().toDate())) {
    return false;
  } else {
    return time.charAt(0).toUpperCase() + time.slice(1);
  }
};



exports.LengthValue = (array) => {
  if (array.length > 1) return "   " + array.length + " personas";
  else if (array.length == 1) return "   " + array.length + " persona";
  else return false;
};

exports.FindAnswer = (eventRequests, currentlyUser, btnAnswer) => {
  console.log(btnAnswer);
  const row = eventRequests.find(
    (result) => result.dataValues.receptorId === currentlyUser
  );
  if (row) {
    if (btnAnswer == "yes") {
      if (row.dataValues.message == "Asistiré") return "btn-primary";
      else return "btn-light";
    } else if (btnAnswer == "not") {
      if (row.message == "No asistiré") return "btn-primary";
      else return "btn-light";
    } else if (btnAnswer == "maybe") {
      if (row.message == "Tal vez asista") return "btn-primary";
      else return "btn-light";
    } else {
      return "btn-light";
    }
  } else {
    return "btn-light";
  }
};



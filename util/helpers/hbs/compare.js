
exports.equals = (a,b) => {
    return a === b;
};

exports.FindUser = (userId, users) => {
    const user = users.find((user) => user.id == userId);
    return user.usuario;
  };

exports.FindImageProfile = (userId, users) => {
    const user = users.find((user) => user.id == userId);
    return user.img;
  };

  exports.FindImageProfile = (userId, users) => {
    const user = users.find((user) => user.id == userId);
    return user.img;
  };

 
var models = require('../models/user_model');


exports.Login = function(req, res) {
  var user_name = req.body.user;
  var key = req.body.password;

  console.log(user_name);
  console.log(key);

  if (user_name && key) {
    models.User.find({username: user_name, password: key}, function(err, user) {
      if (user.length > 0) {
        req.session.user = user_name;
        console.log(req.session.user);
        return res.send("Successful Login");
      }
      else {
        return res.send("fucked u");
      }
    })
  }
  else {
    console.log('wat');
    return res.send("fucked up");
  }
}

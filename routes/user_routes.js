var models = require('../models/user_model');
var crypto = require('crypto');
var nodemailer = require("nodemailer");
var path = require('path');
var fs = require('fs');



exports.Login = function(req, res) {
  var user_field = req.body.user;
  var key = req.body.password;

  console.log(user_field);
  console.log(key);

  if (user_field && key) {
    models.User.find({$and: [{ $or: [{username: user_field}, {email: user_field}]}, {password: key}]}, function(err, user) {
      if (user.length == 1) {
        req.session.user = user[0].username;
        return res.send("Successful Login");
      }
      else {
        return res.send("User not found");
      }
    })
  }
  else {
    return res.send("You need both a user_field and password");
  }
}

exports.SignUp = function(req, res) {
  //console.log("exports.SignUp called");
  var user_name = req.body.user;
  var key = req.body.password;
  var address = req.body.email;
  var country = req.body.country;
  var memo = req.body.memo;


  if (user_name && key) {
    models.User.find({ $or: [{username: user_name},{email:address}]}, function(err, user) {

      if (user.length > 0) {
        return res.send("usernameTaken");
      }
      else {
        var the_user = new User({username: user_name, password:key, email: address, country: country, memo: memo})
        console.log(the_user);
        the_user.save();
        models.User.find({}, function(err,users){
          console.log(users);
          return res.send("Successful SignUp");
        })
      }
    })
  }
}

exports.LoggedIn = function(req, res) {
  if (req.session) {
    return res.send(req.session);
  }
  else {
    return res.send('none');
  }
}



exports.ResetPwdEmail = function(req, res) {
  var email = req.body.user;
  console.log(req.body.user);
  var query = User.findOne({email: email}, function(err, user) {
    if (user) {
      console.log("i am " + Date.now());
      //preparing the token
      crypto.randomBytes(20, function(err, buf) {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        else
        {
          var token = buf.toString('hex');
          let mailTransporter = nodemailer.createTransport({
              //service: "Godaddy",
              host: 'smtpout.secureserver.net',
              port:465,
              //secure: false,
              debug: true,
              secureConnection: false,
              secure: true,
              tls: { ciphers: 'SSLv3' },
              requireTLS: true,
              auth: {
                  user: 'support@whocanwastethemostmoney.com',
                  pass: fs.readFileSync(__dirname + '/pass.txt','utf8').split('\n')[0]
              }
          });

          let mailDetails = {
              from: 'support@whocanwastethemostmoney.com',
              to: email,
              subject: 'Reset Your Password',
              text: 'We have received a request to reset the password for your whocanwastethemostmoney.com account.'+
              'Please use the following link to reset your password: https://whocanwastethemostmoney.com/reset_password?token='+token
          };

          mailTransporter.sendMail(mailDetails, function(err, data) {
              if(err) {
                  console.log('Error Occurs');
                  // var content;
                  // fs.readFile(__dirname + '/pass.txt', 'utf-8', (err, data) => {
                  //     if (err) throw err;
                  //     console.log('data is' + data);
                  //     content = data;
                  //     return data;
                  //
                  //   })
                    var text = fs.readFileSync(__dirname + '/pass.txt','utf8');
                    var hola = text.split('\n');
                    console.log(hola);


                  return res.send(err);
              } else {
                  console.log('Email sent successfully');
                  user.reset_password_token = token;
                  user.reset_password_expires = Date.now() + 86400000;
                  user.save();
                  console.log(user);
                  return res.send('email sent');

              }
          });

        }
      });
    }
    //if the user email was not found
    else {
      return res.send("user not found");

    }
  });
}

exports.ResetPassword = function(req, res) {
  console.log(req.body);

  //write code here to make sure the passwords are the same
  models.User.findOne({reset_password_token : req.body.token, reset_password_expires: {
    $gt: Date.now()
  }
}).exec(function(err, user) {
  if (!err && user) {
    if (req.body.newPassword === req.body.verifyPassword) {
      user.reset_password_token = undefined;
      user.reset_password_expires = undefined;
      user.password = req.body.newPassword;
      user.save();
      return res.send("Password Reset Successfully");
    }
  }
})
}

// exports.render_reset_password = function(req, res) {
//   return res.sendFile(path.resolve(("../dist/reset-password.html"));
// }

exports.UpdateProfile = function(req, res) {
  console.log(req.body);
  models.User.findOneAndUpdate({username: req.session.user}, {memo: req.body.text},function(err, user){
    if (err) throw err;
    return res.send("success");
  })
}

exports.Logout = function(req, res) {
    console.log(req.session);
    req.session = null;
    console.log(req.session);
    return res.send('user logged out');
}

exports.MyProfile = function(req, res) {
    var query = User.findOne({username: req.session.user});
    query.select("username amount country memo email");
    query.exec(function(err, user){
      if(!err && user) {
        return res.send(user);
      }
    })


    models.User.findOne({username: req.session.user}).exec(function(err, user){
      if (!err && user) {

        return res.send
      }
    })
}



exports.DisplayTop20 = function(req, res) {

  var query = User.find({});

  query.select('username amount country memo');
  query.sort({'amount': -1});

  query.exec(function(err, top_users) {
        if (err) throw err;
        console.log(top_users);
        res.send(top_users);
  });

};

exports.UpdateAmount = function(req, res) {
  console.log("req.body is" + req.body.total);
  models.User.findOneAndUpdate({username: req.session.user}, {$inc:{amount: req.body.total}},function(err, user){
    if (err) throw err;
    res.send("Amount Updated Successfully");
  })

}

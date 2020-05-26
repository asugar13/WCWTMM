'use strict';



var user_routes = require('../routes/user_routes');

var express = require('express');
var bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
var session = require('cookie-session');

var app = express();

app.use(session({secret: "Shh, its a secret!"}));
//app.use(express.static(__dirname + '/../public'));

app.use(express.static(__dirname + '/assets/scripts'));
app.use(express.static(__dirname + '/assets/css'));

//app.use(express.static(__dirname + '/../assets'));
//new line
app.use(express.static(__dirname + '/../dist'));

app.engine('.html', require('ejs').__express);
app.set('views', __dirname +'/../dist');
app.set('view engine', 'html');

// The request body is received on GET or POST.
// A middleware that just simplifies things a bit.
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

// Get the index page:
app.get('/', function(req, res) {
        res.render('welcome', {  // Note that .html is assumed.
        errors: ''
    });
}
);


app.get('/forgotten_password', function(req, res) {
        res.render("forgotten-password", {
          errors: ''
        });
});

app.get('/reset_password', function(req, res) {
        res.render("reset-password", {
          errors: ''
        });
});

app.get('/my_profile', function(req, res) {
        //return res.sendFile(__dirname + "/../dist/my-profile");
        return res.render("my-profile", {
          errors: ''
        });
});

app.post('/reset_password', user_routes.ResetPassword);
//app.get('/reset_password', user_routes.render_reset_password);
app.get('/my_account', user_routes.MyProfile);
app.post('/forgotten_password', user_routes.ResetPwdEmail);
app.post('/login', user_routes.Login);
app.post('/signup', user_routes.SignUp);
app.get('/loggedin', user_routes.LoggedIn);
app.get('/top20', user_routes.DisplayTop20);
app.get('/logout', user_routes.Logout);
app.post('/updateamount', user_routes.UpdateAmount);
app.post('/update_profile', user_routes.UpdateProfile); 


https.createServer({
  key: fs.readFileSync(__dirname +'/server.key'),
  cert: fs.readFileSync(__dirname +'/server.cert')
}, app).listen(3000, () => {
  console.log('Listening on port 3000')
})

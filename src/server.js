'use strict';

var user_routes = require('../routes/user_routes');

var express = require('express');
var bodyParser = require('body-parser');
const  https = require('https');
const fs = require('fs');
var session = require('express-session')

var app = express();

app.use(session({secret: "Shh, its a secret!"}));

// The request body is received on GET or POST.
// A middleware that just simplifies things a bit.
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use(express.static(__dirname + '/../public'));
app.use(express.static(__dirname + '/../assets'));

// Get the index page:
app.get('/', function(req, res) {
  if (req.session.user) {
    res.render(__dirname+'/../public/main_page.html');
  }
  else {  res.render('/../public/index', {  // Note that .html is assumed.
        errors: ''
    });
}});

app.post('/login', user_routes.Login);

https.createServer({
  key: fs.readFileSync(__dirname +'/server.key'),
  cert: fs.readFileSync(__dirname +'/server.cert')
}, app).listen(3000, () => {
  console.log('Listening...')
})

//app.listen(3000, console.log('Running on port 3000'));

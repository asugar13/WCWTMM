'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// The request body is received on GET or POST.
// A middleware that just simplifies things a bit.
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use(express.static(__dirname))

//app.set('view engine', 'html');


var user_routes = require('./user_routes');

// Get the index page:
app.get('/', function(req, res) {
    res.render('index', {  // Note that .html is assumed.
        errors: ''
    });
});

app.post('/signup', user_routes.SignUp);


app.listen(3000, console.log('Running on port 3000'));

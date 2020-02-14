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

//bullshit goes There
//app.engine('.html', require('ejs').__express);

//app.use('/assets', express.static(__dirname + '/../assets'));

//till here

app.use(express.static(__dirname + '/../public'));
app.use(express.static(__dirname + '/../assets'));

//app.use(express.static(__dirname + '/'));


//app.set('view engine', 'html');

var user_routes = require('../routes/user_routes');

// Get the index page:
app.get('/', function(req, res) {
    res.render('/../public/index', {  // Note that .html is assumed.
        errors: ''
    });
});

app.post('/login', user_routes.Login);


app.listen(3000, console.log('Running on port 3000'));

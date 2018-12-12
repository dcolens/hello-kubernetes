var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var os = require("os");
var morgan = require('morgan');

var nocache = require('nocache');
app.use(nocache());
app.disable('etag');

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static('static'));
app.use(morgan('combined'));

// Configuration
var port = process.env.PORT || 8080;
var message = process.env.MESSAGE || "Hello cisco TAC!";

app.get('/', function (req, res) {
  console.log(req.headers);
  if (req.headers.accept && req.headers.accept.indexOf('html') > -1) {
    res.render('home', {
      message: message,
      platform: os.type(),
      release: os.release(),
      hostName: os.hostname()
    });
  } else {
    res.send({
      message: message,
      platform: os.type(),
      release: os.release(),
      hostName: os.hostname()
    });
  }

});

// Set up listener
app.listen(port, function () {
  console.log("Listening on: http://%s:%s", os.hostname(), port);
});

var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send("What's up?!");
});

var server = app.listen((process.env.PORT || 3000), function() {
  console.log("Server has started at port - %s", server.address().port);
});

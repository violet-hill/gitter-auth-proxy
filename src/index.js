var app = require('express')();

var oauth2 = require('simple-oauth2')({
  clientID: process.env.GITTER_KEY,
  clientSecret: process.env.GITTER_SECRET,
  site: 'https://gitter.im',
  authorizationPath: '/login/oauth/authorize',
  tokenPath: '/login/oauth/token'
});

var callbackURI = process.env.APP_HOST + '/login/callback';
var authorizationURI = oauth2.authCode.authorizeURL({ redirect_uri: callbackURI });

app.get('/', function(req, res) {
  res.send("What's up?!");
});

app.get('/login', function(req, res) {
  res.redirect(authorizationURI);
});

app.get('/login/callback', function(req, res) {
  oauth2.authCode.getToken({ code: req.query.code,  redirect_uri: callbackURI },
    function(error, result) {
      if (error) {
        res.redirect('/login');
      } else {
        token = oauth2.accessToken.create(result).token.access_token;
        res.send("Your token is a " + token);
      }
    }
  );
});

var server = app.listen((process.env.PORT || 3000));
console.log("Server has started at port - %s", server.address().port);

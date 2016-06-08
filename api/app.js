var express        = require('express');
var cors           = require('cors');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var methodOverride = require('method-override');
var jwt            = require('jsonwebtoken');
var expressJWT     = require('express-jwt');
var app            = express();

var routes         = require('./config/routes');
var config         = require('./config/config');
var secret         = config.secret;

var passport = require('passport');
// require('./config/passport')(passport);

var mongoUri       = process.env.MONGOLAB_URI || config.database;
mongoose.connect(mongoUri)

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(process.env.PORT || 3000);
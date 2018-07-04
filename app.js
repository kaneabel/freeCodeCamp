const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const ejs = require('ejs');

const log = require('./utils');

// Initiate app
const app = express();

// Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

// Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// use HTML as the view engine
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// Configure Mongoose
mongoose.connect('mongodb://localhost/node-passport-jwt', (err) => {
  if (err) {
    throw err;
  }

  log('Mongoose have been connected successfully');
});
mongoose.set('debug', true);

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'node-passport-jwt',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}));

// Models and Routers
require('./models/User');
require('./config/passport');
app.use(require('./routes/index'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

if(!isProduction) {
  app.use(errorHandler());
}

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

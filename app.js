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

let uri = 'mongodb://localhost/fcc-api';

if (isProduction) {
  const dbuser = process.env.DB_USER
  const dbpassword = process.env.DB_PASSWORD
  uri = `mongodb://${dbuser}:${dbpassword}@ds125851.mlab.com:25851/fcc-api`;
}

// Configure Mongoose
mongoose.connect(uri, (err) => {
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
  secret: 'fcc-api',
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

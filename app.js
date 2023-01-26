var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jsend = require('jsend');
const corsSecurity = require('./src/middlewares/cors');
const tokenSecurity = require('./src/middlewares/token');

var indexRouter = require('./src/routes/index');
var authRouter = require('./src/routes/auth');
var apiRouter = require('./src/routes/api');
var collectionRouter = require('./src/routes/collection');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(jsend.middleware);

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/api', tokenSecurity, apiRouter);
app.use('/collection', collectionRouter);

// CORS
app.use(corsSecurity);

module.exports = app;

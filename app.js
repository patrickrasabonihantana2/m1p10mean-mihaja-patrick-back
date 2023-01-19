var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const Env = require('./src/util/env');

var indexRouter = require('./src/routes/index');
var authRouter = require('./src/routes/auth');
var apiRouter = require('./src/routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/api', apiRouter);


const allowedOrigins = (Env.SECURITY_CORS_ALLOW_ORIGIN || '').split(',').map((s) => s.trim());
const allowedMehods = Env.SECURITY_CORS_ALLOW_METHODS;
const allowedHeaders = Env.SECURITY_CORS_ALLOW_HEADERS;
const allowCredentialds = Env.SECURITY_CORS_ALLOW_CREDENTIALS;

// CORS
app.use(cors({
  origin: (origin, callback) => {
    const originAllowed = allowedOrigins.some((o) => {
      const test = (o) => {
        try {
          const r = new RegExp(o, 'i');
          return r.test(origin);
        } catch {
          return false;
        }
      };
      return o === '*' || test(o);
    });

    if (originAllowed) callback(null, origin);
    else callback(new Error('not allowed'), []);
  },
  methods: allowedMehods,
  allowedHeaders: allowedHeaders,
  optionsSuccessStatus: 200,
  credentials: allowCredentialds,
}));

module.exports = app;

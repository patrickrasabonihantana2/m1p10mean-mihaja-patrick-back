const cors = require('cors');
const Env = require('../util/env');

const allowedOrigins = (Env.SECURITY_CORS_ALLOW_ORIGIN || '').split(',').map((s) => s.trim());
const allowedMehods = Env.SECURITY_CORS_ALLOW_METHODS;
const allowedHeaders = Env.SECURITY_CORS_ALLOW_HEADERS;
const allowCredentialds = Env.SECURITY_CORS_ALLOW_CREDENTIALS;

const corsSecurity = cors({
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
});

module.exports = corsSecurity;

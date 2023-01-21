const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

const env = dotenv.config();
dotenvExpand.expand(env);

const Env = {
    MONGO_URL: process.env.MONGO_URL || 'mongodb://root:example@mongo:27017/',
    MONGO_DB: process.env.MONGO_DB || 'garage_test',
    SECURITY_CORS_ALLOW_ORIGIN: process.env.SECURITY_CORS_ALLOW_ORIGIN || "",
    SECURITY_CORS_ALLOW_METHODS: process.env.SECURITY_CORS_ALLOW_METHODS || "",
    SECURITY_CORS_ALLOW_HEADERS: process.env.SECURITY_CORS_ALLOW_HEADERS || "",
    SECURITY_CORS_ALLOW_CREDENTIALS:
      (process.env.SECURITY_CORS_ALLOW_CREDENTIALS || "true").toLowerCase() ===
      "true",
    SECURITY_JWT_SECRET: process.env.SECURITY_JWT_SECRET || '3436864e-f3ef-4fc7-8c82-6fb0c08ea697'
};

module.exports = Env;

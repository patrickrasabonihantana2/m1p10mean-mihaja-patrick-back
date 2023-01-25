const jwt = require('jsonwebtoken');
const {Request, Response} = require('express');
const Env = require('../util/env');

/**
 * verrifie le token
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
function tokenSecurity(req, res, next) {
  let tokenValue = req.header('authorization');
  tokenValue = tokenValue.substring(7);
  try {
    jwt.verify(tokenValue, Env.SECURITY_JWT_SECRET);
  } catch(err) {
    res.status(401).json("token invalide");
  }
  next();
}

module.exports = tokenSecurity;

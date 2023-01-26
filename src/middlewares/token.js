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
  if(tokenValue == undefined || tokenValue == null || tokenValue == ''){
    let data = {
      message: "token vide"
    }
    res.status(401).jsend.fail(data);
  }
  tokenValue = tokenValue.startsWith('Bearer') ? tokenValue.substring(7) : tokenValue;
  try {
    let data = jwt.verify(tokenValue, Env.SECURITY_JWT_SECRET);
    req.app.set('utilisateur', data.utilisateur);
  } catch(err) {
    let data = {
      message: "token invalide"
    }
    res.status(401).jsend.fail(data);
  }
  next();
}

module.exports = tokenSecurity;

const express = require('express');
const router = express.Router();
const model = require('../models/accountModel.js');

// GET REQUESTS //

router.get('/accounts', (req, res, next) => {
  console.log(req.query.accountId);
  if (!req.query.accountId) {
    res.sendStatus(404);
    return;
  }
  model.getAccountInfo(req.query.accountId)
    .then((result) => {
      let accountInfo = result.rows[0];
      accountInfo ?
        res.status(200).send(accountInfo) :
        res.sendStatus(404)
    })
    .catch((error) => res.status(404).send(error));
});

// POST REQUESTS //

// req.body.email - String
// req.body.firstName - String
// req.body.lastName - String
// req.body.password - String
// req.body.teacher - Boolean
// TODO: Generate a session, provide it in response
router.post('/accounts/signup', (req, res, next) => {
  if (typeof req.body.teacher !== 'boolean') {
    res.status(400).send('Invalid request body property');
    return;
  }
  if (req.body.teacher) {
    if (!req.body.email /* TODO: Run .edu email validation */) {
      res.status(400).send('Email provided is not hosted on .edu domain');
      return;
    }
  }
  let account = {
    email: req.body.email,
    passwordHash, // TODO: Generate pw hash from req.body.password
    passwordSalt, // TODO: Generate pw salt from req.body.password
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    isTeacher: req.body.teacher
  }
  model.createAccount(account)
    .then((accountId) => {
      res.status(201).send(accountId);
    })
    .catch((error) => res.status(400).send(error));
});

// req.body.email - String
// req.body.password - String
router.post('/accounts/login', (req, res, next) => {

  // TODO: This isn't right, don't pay close attention to this when you return to it
  let account = {
    email: req.body.email,
    passwordHash, // TODO: Generate pw hash from req.body.password
    passwordSalt // TODO: Generate pw salt from req.body.password
  }
  model.getAccount(account)
    .then((accountId) => {
      res.status(201).send(accountId);
    })
    .catch((error) => res.status(400).send(error));
});

module.exports = router;

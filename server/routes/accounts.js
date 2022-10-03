const express = require('express');
const router = express.Router();
const model = require('../models/accountModel.js');

// GET REQUESTS //

// Get account info by account type (teacher, student)
// Only gets information from accounts matching the requesting user
router.get('/accounts', (req, res, next) => {
  model.getAccountsByType(req.user.isTeacher)
    .then((result) => {
      let accounts = result.rows;
      accounts ?
        res.status(200).send(accounts) :
        res.sendStatus(404)
    })
    .catch((error) => res.status(404).send(error));
});

// Get account info by ID
// req.body.accountId
router.get('/accounts/id', (req, res, next) => {
  if (!req.query.accountId) {
    res.sendStatus(404);
    return;
  }
  model.getPublicAccountInfoById(req.query.accountId)
    .then((result) => {
      let accountInfo = result.rows[0];
      accountInfo ?
        res.status(200).send(accountInfo) :
        res.sendStatus(404)
    })
    .catch((error) => res.status(404).send(error));
});

module.exports = router;

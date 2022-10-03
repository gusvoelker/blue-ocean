const express = require('express');
const router = express.Router();
const model = require('../models/accountModel.js');

// GET REQUESTS //

// Get all account info by account type (teacher, student)
// Only gets information from accounts matching the requesting user
// TODO: Add ability to filter accounts by name / email (?)
router.get('/accounts', (req, res, next) => {
  model.getAccountsByType(req.user.isTeacher)
    .then((result) => {
      let accounts = result.rows;
      accounts ?
        res.status(200).send(accounts) :
        res.sendStatus(404);
    })
    .catch((error) => res.status(404).send(error));
});

// Get account info for a provided accountId
// req.body.accountId
// If not providing accountId, instead provides info for the requesting user
router.get('/accounts/id', (req, res, next) => {
  let userId = req.query.accountId || req.user.id;
  model.getPublicAccountInfoById(userId)
    .then((result) => {
      let accountInfo = result.rows[0];
      accountInfo ?
        res.status(200).send(accountInfo) :
        res.sendStatus(404);
    })
    .catch((error) => res.status(404).send(error));
});

module.exports = router;

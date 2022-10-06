const express = require('express');
const router = express.Router();
const model = require('../models/accountModel.js');

// GET REQUESTS //

// Get all account info by account type (teacher, student)
// Only gets information from accounts matching the requesting user
// TODO: Add ability to filter accounts by name / email (?)
// may decide to get all account info regardless of type
router.get('/accounts', (req, res, next) => {
  model.getAccountsByType(req.user.isTeacher)
    .then((result) => {
      let accounts = result.rows;
<<<<<<< HEAD
        res.status(200).send(accounts);
=======
      res.status(200).send(accounts);
>>>>>>> dev
    })
    .catch((error) => res.sendStatus(404));
});

// Get account info for a provided accountId
// req.query.accountId
// If not providing accountId, instead provides info for the requesting user
router.get('/accounts/id', (req, res, next) => {
  let userId = req.query.accountId || req.user.id;
  model.getPublicAccountInfoById(userId)
    .then((result) => {
      let accountInfo = result.rows;
      accountInfo.length > 0 ?
        res.status(200).send(accountInfo[0]) :
        res.sendStatus(404);
    })
    .catch((error) => res.sendStatus(404));
});

module.exports = router;

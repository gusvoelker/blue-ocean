const express = require('express');
const router = express.Router();
const model = require('../models/languageModel.js');

// TODO: Must validate that request is coming from teacher account
router.post('/language/taught', (req, res, next) => {
  // TODO: Get teacherId by searching db sessions table with request cookie hash (session)
  // TODO: Figure out how to insert many rather than just one at a time
  model.insertTaughtLanguage(teacherId, req.body.taughtLevel, req.body.language)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => res.status(400).send(error));
});

// TODO: See above
// TODO: Must validate that request is coming from user (non-teacher) account
router.post('/language/known', (req, res, next) => {
  model.insertKnownLanguage(userId, req.body.language)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => res.status(400).send(error));
});

// TODO: See above
router.post('/language/desired', (req, res, next) => {
  model.insertDesiredLanguage(userId, req.body.language)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => res.status(400).send(error));
});

module.exports = router;

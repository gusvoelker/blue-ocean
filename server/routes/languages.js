const express = require('express');
const router = express.Router();
const model = require('../models/languageModel.js');

// GET REQUESTS //

// Get all languages available
router.get('/languages', (req, res, next) => {
  model.getAllLanguages()
    .then((result) => {
      let languages = result.rows;
      languages.length > 0 ?
        res.status(200).send(languages) :
        res.sendStatus(404)
    })
    .catch((error) => res.status(404).send(error));
});

// Get taught languages for a given accountId (must be a teacher)
router.get('/languages/taught', (req, res, next) => {
  if (!req.query.accountId) {
    res.sendStatus(404);
    return;
  }
  model.getTaughtLanguagesByTeacherId(req.query.accountId)
    .then((result) => {
      let languages = result.rows;
      languages.length > 0 ?
        res.status(200).send(languages) :
        res.sendStatus(404)
    })
    .catch((error) => res.status(404).send(error));
});

// Get known languages for a given accountId (must be a user)
router.get('/languages/known', (req, res, next) => {
  if (!req.query.accountId) {
    res.sendStatus(404);
    return;
  }
  model.getKnownLanguagesByUserId(req.query.accountId)
    .then((result) => {
      let languages = result.rows;
      languages.length > 0 ?
        res.status(200).send(languages) :
        res.sendStatus(404)
    })
    .catch((error) => res.status(404).send(error));
});

// Get desired languages for a given accountId (must be a user)
router.get('/languages/desired', (req, res, next) => {
  if (!req.query.accountId) {
    res.sendStatus(404);
    return;
  }
  model.getDesiredLanguagesByUserId(req.query.accountId)
    .then((result) => {
      let languages = result.rows;
      languages.length > 0 ?
        res.status(200).send(languages) :
        res.sendStatus(404)
    })
    .catch((error) => res.status(404).send(error));
});

// POST REQUESTS //

// TODO: Must validate that request is coming from teacher account
router.post('/languages/taught', (req, res, next) => {
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
router.post('/languages/known', (req, res, next) => {
  model.insertKnownLanguage(userId, req.body.language)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => res.status(400).send(error));
});

// TODO: See above
router.post('/languages/desired', (req, res, next) => {
  model.insertDesiredLanguage(userId, req.body.language)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => res.status(400).send(error));
});

module.exports = router;

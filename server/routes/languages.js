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
        res.sendStatus(404);
    })
    .catch((error) => res.status(404).send(error));
});

// Get taught languages for a given accountId
// Querying this with an accountId for a student
// should result in a 404 (nothing will be found)
// If accountId is not provided, retrieves info for requesting user
router.get('/languages/taught', (req, res, next) => {
  let accountId = req.query.accountId || req.user.id;
  model.getTaughtLanguagesByTeacherId(accountId)
    .then((result) => {
      let languages = result.rows;
      languages.length > 0 ?
        res.status(200).send(languages) :
        res.sendStatus(404);
    })
    .catch((error) => res.status(404).send(error));
});

// Get known languages for a given accountId
// Querying this with an accountId for a teacher
// should result in a 404 (nothing will be found)
// If accountId is not provided, retrieves info for requesting user
router.get('/languages/known', (req, res, next) => {
  let accountId = req.query.accountId || req.user.id;
  model.getKnownLanguagesByUserId(accountId)
    .then((result) => {
      let languages = result.rows;
      languages.length > 0 ?
        res.status(200).send(languages) :
        res.sendStatus(404);
    })
    .catch((error) => res.status(404).send(error));
});

// Get desired languages for a given accountId
// Querying this with an accountId for a teacher
// should result in a 404 (nothing will be found)
// If accountId is not provided, retrieves info for requesting user
router.get('/languages/desired', (req, res, next) => {
  let accountId = req.query.accountId || req.user.id;
  model.getDesiredLanguagesByUserId(accountId)
    .then((result) => {
      let languages = result.rows;
      languages.length > 0 ?
        res.status(200).send(languages) :
        res.sendStatus(404);
    })
    .catch((error) => res.status(404).send(error));
});

// POST REQUESTS //

// Expects in req.body:
//  taughtLevel - String in range ('1', '2', '3', '4', '5', 'AP')
//  language - String
// Meant for teachers, will 403 on request by a student account
router.post('/languages/taught', (req, res, next) => {
  if (!req.user.isTeacher) {
    res.sendStatus(403);
    return;
  }
  // TODO: Figure out how to insert many rather than just one at a time
  model.insertTaughtLanguage(req.user.id, req.body.taughtLevel, req.body.language)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => res.status(400).send(error));
});

// Expects in req.body:
//  language - String
// Meant for students, will 403 on request by a teacher account
router.post('/languages/known', (req, res, next) => {
  if (req.user.isTeacher) {
    res.sendStatus(403);
    return;
  }
  model.insertKnownLanguage(req.user.id, req.body.language)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => res.status(400).send(error));
});

// Expects in req.body:
//  language - String
// Meant for students, will 403 on request by a teacher account
router.post('/languages/desired', (req, res, next) => {
  if (req.user.isTeacher) {
    res.sendStatus(403);
    return;
  }
  model.insertDesiredLanguage(req.user.id, req.body.language)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => res.status(400).send(error));
});

module.exports = router;

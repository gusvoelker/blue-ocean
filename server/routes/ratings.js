const express = require('express');
const router = express.Router();
const ratingsModel = require('../models/ratingsModel.js');
const accountModel = require('../models/accountModel.js');

// GET REQUESTS //

// Get average language ratings for a provided student account ID
// Grouped by language
// Expects in req.query:
//  accountId (INTEGER) - Student to get ratings for
router.get('/ratings', (req, res, next) => {
  if (!req.query.accountId) {
    res.sendStatus(400);
    return;
  }
  ratingsModel.getRatingsAvgByStudentId(req.query.accountId)
    .then((result) => res.status(200).send(result.rows))
    .catch((error) => res.sendStatus(404))
});

// POST REQUESTS //

// Add a rating for a provided student account ID and language
// Expects in req.body:
//  accountId (INTEGER) - Student to rate
//  languageId (INTEGER) - Language to rate student on
//  rating (INTEGER) - Rating (1-4)
// TODO(?): Require that students are connected to rate
router.post('/ratings', (req, res, next) => {
  if (req.user.isTeacher) { // Disallow teachers to rate students
    res.sendStatus(403);
    return;
  }
  accountModel.getAccountTypeById(req.body.accountId)
    .then((result) => {
      if (!result.rows[0]) { // Checks that the requested accountId exists
        res.status(400).send({
          message: 'Account not found'
        });
        return;
      }
      if (result.rows[0].is_teacher) { // Checks that the requested account is a student
        res.status(403).send({
          message: 'Teachers can not be rated!'
        });
        return;
      }
      ratingsModel.addRating(req.user.id, req.body.accountId, req.body.languageId, req.body.rating)
        .then((result) => res.sendStatus(201))
        .catch((error) => res.sendStatus(400));
    })
    .catch((error) => res.sendStatus(400));
});

module.exports = router;

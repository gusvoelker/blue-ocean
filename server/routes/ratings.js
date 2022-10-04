const express = require('express');
const router = express.Router();
const model = require('../models/ratingsModel.js');

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
  model.getRatingsAvgByStudentId(req.query.accountId)
    .then((result) => res.status(200).send(result.rows))
    .catch((error) => res.sendStatus(404))
});

// POST REQUESTS //

// Add a rating (1-4) for a provided student account ID and language
// Expects in req.body:
//  accountId (INTEGER) - Student to rate
router.post('/ratings', (req, res, next) => {
  if (req.user.isTeacher) { // Disallow teachers to rate students
    res.sendStatus(403);
    return;
  }
  model.addRating(req.user.id, req.body.accountId, req.body.rating, req.body.languageId)
    .then((result) => res.sendStatus(201))
    .catch((error) => res.sendStatus(400))
});

module.exports = router;

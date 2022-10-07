const express = require('express');
const router = express.Router();
const meetingsModel = require('../models/meetingsModel.js');

// GET REQUESTS //

//returns all meetings for current user.
router.get('/meetings', (req, res, next) => {
  meetingsModel.findMeetings(req.user.id)
  .then(({rows}) => {
    res.status(200).send(rows);
  })
  .catch((error) => res.sendStatus(400))
});

//returns all pending meetings for current user
router.get('/meetings/requests', (req, res, next) => {
  meetingsModel.findMeetingsRequests(req.user.id)
  .then(({rows}) => {
    res.status(200).send(rows);
  })
  .catch((error) => res.sendStatus(400))
});


// POST REQUESTS //
//requests a meeting
router.post('/meetings', (req, res, next) => {
  console.log('post meetings ', req.body, req.query)
  let receiverId = req.body.receiverId;
  let dateTime = req.body.start_time;
  // let dateTime = 'October 15 04:05:06 2022 EST';
  meetingsModel.requestMeeting(req.user.id, receiverId, dateTime)
  .then((result) => {
    meetingsModel.findMeetings(req.user.id)
    .then((rows) => {
      res.status(201).send(rows.rows);
    })
    .catch((error) => res.sendStatus(400))
  })
  .catch((error) => res.sendStatus(400))
})

//accepts a meeting (dupe record with status=true)
router.put('/meetings', (req, res, next) => {
  let requesterId = req.body.requesterId;
  console.log('put /meetings', req.body, req.query);
  let dateTime = req.body.dateTime;
  //console.log(requesterId, receiverId, dateTime)
  meetingsModel.acceptMeeting(requesterId, req.user.id, dateTime)
  .then((result) => {
    console.log('meeting accepted')
    meetingsModel.createMeeting(requesterId, req.user.id, dateTime)
    .then(({rows}) => {
      res.sendStatus(201);
    })
    .catch((error) => res.sendStatus(400))
  })
  .catch((error) => res.sendStatus(400))
})

router.delete('/meetings', (req, res, next) => {
  console.log(req.body, req.query);
  if (req.user.id !== req.query.requesterId && req.user.id !== req.query.requesterId) {
    return res.sendStatus(403); // Denies request if not placed by authenticated user
  }
  let requesterId = req.query.requesterId;
  let receiverId = req.query.receiverId;
  let dateTime = req.query.dateTime;
  meetingsModel.deleteMeeting1(requesterId, receiverId, dateTime)
  .then((result) => {
    console.log('first meeting deleted');
    meetingsModel.deleteMeeting2(requesterId, receiverId, dateTime);
  })
  .then((result) => {
    console.log('second meeting deleted');
    res.sendStatus(200);
  })
  .catch((error) => res.sendStatus(400))
})

module.exports = router;

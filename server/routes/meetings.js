const express = require('express');
const router = express.Router();
const meetingsModel = require('../models/meetingsModel.js');

// GET REQUESTS //

//returns all meetings for current user.
router.get('/meetings', (req, res, next) => {
  let requesterId = req.user.id;
  meetingsModel.findMeetings(requesterId)
  .then(({rows}) => {
    res.status(200).send(rows);
  })
  .catch((error) => res.status(400).send(error))
});

//returns all pending meetings for current user
router.get('/meetings/requests', (req, res, next) => {
  //let receiverId = req.user.user; THIS DOESN'T WORK
  let receiverId = req.body.user;
  meetingsModel.findMeetingsRequests(receiverId)
  .then(({rows}) => {
    res.status(200).send(rows);
  })
  .catch((error) => res.status(400).send(error))
});


// POST REQUESTS //
//requests a meeting
router.post('/meetings', (req, res, next) => {
  console.log(req.body)
  let requesterId = req.user.id;
  let receiverId = req.body.receiverId;
  let dateTime = req.body.dateTime;
  // let dateTime = 'October 15 04:05:06 2022 EST';
  meetingsModel.requestMeeting(requesterId, receiverId, dateTime)
  .then(({rows}) => {
    console.log(rows);
    res.status(201).send(rows);
  })
  .catch((error) => res.status(400).send(error))
})

//accepts a meeting (dupe record with status=true)
router.put('/meetings', (req, res, next) => {
  let requesterId = req.user.id;
  //console.log(req.body)
  let receiverId = req.body.receiverId;
  let dateTime = req.body.dateTime;
  //console.log(requesterId, receiverId, dateTime)
  meetingsModel.acceptMeeting(requesterId, receiverId, dateTime)
  .then((result) => {
    console.log(result)
    //res.status(200).end()
    meetingsModel.createMeeting(requesterId, receiverId, dateTime)
  })
  .then(({rows}) => {
    res.status(201).end();
  })
  .catch((error) => res.status(400).send(error))
})

router.delete('/meetings', (req, res, next) => {
  let requesterId = req.user.id;
  let receiverId = req.body.receiverId;
  let dateTime = req.body.dateTime;
  meetingsModel.deleteMeeting1(requesterId, receiverId, dateTime)
  .then((result) => {
    console.log('first meeting deleted')
    meetingsModel.deleteMeeting2(requesterId, receiverId, dateTime)
  })
  .then((result) => {
    console.log('second meeting deleted')
    res.status(200).end()
  })
  .catch((error) => res.status(400).send(error))
})

module.exports = router;
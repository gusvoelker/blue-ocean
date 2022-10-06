const express = require('express');
const router = express.Router();
const meetingsModel = require('../models/meetingsModel.js');

// GET REQUESTS //

//returns all meetings for current user.
router.get('/meetings', (req, res, next) => {
  let requesterId = req.user.id || req.body.user_id
  meetingsModel.findMeetings(requesterId)
  .then(({rows}) => {
    res.status(200).send(rows);
  })
  .catch((error) => res.status(400).send(error))
});

//returns all pending meetings for current user
router.get('/meetings/requests', (req, res, next) => {
  //let receiverId = req.user.user; THIS DOESN'T WORK
  let receiverId = req.user.id || req.body.user_id
  meetingsModel.findMeetingsRequests(receiverId)
  .then(({rows}) => {
    res.status(200).send(rows);
  })
  .catch((error) => res.status(400).send(error))
});


// POST REQUESTS //
//requests a meeting
router.post('/meetings', (req, res, next) => {
  console.log('post meetings ', req.body, req.query)
  let requesterId = req.user.id || req.body.requesterId;
  let receiverId = req.body.receiverId;
  let dateTime = req.body.start_time;
  // let dateTime = 'October 15 04:05:06 2022 EST';
  meetingsModel.requestMeeting(requesterId, receiverId, dateTime)
  .then(({rows}) => {
    meetingsModel.findMeetings(requesterId).then(rows =>{
      res.status(201).send(rows.rows);
    }).catch(error =>{res.status(400).send(error)})
  })
  .catch((error) => res.status(400).send(error))
})

//accepts a meeting (dupe record with status=true)
router.put('/meetings', (req, res, next) => {
  let requesterId = req.body.requesterId;
  console.log('put /meetings', req.body, req.query)

  let receiverId = req.user.id || req.body.receiverId;
  let dateTime = req.body.dateTime;
  //console.log(requesterId, receiverId, dateTime)
  meetingsModel.acceptMeeting(requesterId, receiverId, dateTime)
  .then((result) => {
    console.log('meeting accepted')
    meetingsModel.createMeeting(requesterId, receiverId, dateTime)
    .then(({rows}) => {
      res.status(201).end();
    })
    .catch(error =>{res.status(400).send(error)})
  })
  .catch((error) => res.status(400).send(error))
})

router.delete('/meetings', (req, res, next) => {
  console.log(req.body, req.query)
  let requesterId = req.query.requesterId;
  let receiverId = req.query.receiverId;
  let dateTime = req.query.dateTime;
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
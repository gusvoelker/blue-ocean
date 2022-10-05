const express = require('express');
const router = express.Router();
const meetingsModel = require('../models/meetingsModel.js');

router.get('/meetings', (req, res, next) => {
  let requesterId = req.user.id;
  meetingsModel.findMeetings()
  .then(({rows}) => {
    res.status(200).send(rows);
  })
  .catch((error) => res.status(400).send(error))
})


// router.post('/meetings', (req, res, next) => {
//   let requesterId = req.user.id;
//   let receiverId = req.user.id;
//   let meetingDateTime = req.meeting.meetingDateTime;
// })


// router.put('/meetings', (req, res, next) => {
//   let requesterId = req.user.id;
//   let receiverId = req.user.id;
//   let meetingDateTime = req.meeting.meetingDateTime;
// })

// router.delete('/meetings', (req, res, next) => {
//   let requesterId = req.user.id;
//   let receiverId = req.user.id;
//   let meetingDateTime = req.meeting.meetingDateTime;
// })
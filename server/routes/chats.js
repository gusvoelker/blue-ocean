const express = require('express');
const router = express.Router();
const chatModel = require('../models/chatModel.js');
const friendModel = require('../models/friendModel.js');
const accountModel = require('../models/accountModel.js');

// GET REQUESTS //

// Get a list of chats for the authenticated user / teacher
router.get('/chats', (req, res, next) => {
  chatModel.getRoomsByAccountId(req.user.id)
    .then((result) => {
      let rooms = result.rows;
      res.status(200).send(rooms);
    })
    .catch((error) => res.sendStatus(400));
});

// Expects requestedId - user to get room with
router.get('/chats/id', (req, res, next) => {
  let requestedId = parseInt(req.query.requestedId);
  chatModel.getRoomIdByParticipants(req.user.id, requestedId)
    .then((result) => {
      let room = result.rows[0];
      res.status(200).send(room);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400)
    });
});

// Get a list of messages in the provided roomId for the authenticated user / teacher
// Expects in request query: roomId - Integer representing a chat room ID
router.get('/chats/messages', (req, res, next) => {
  if (!req.query.roomId) {
    return res.sendStatus(404);
  }
  let roomId = parseInt(req.query.roomId);
  chatModel.getMessagesByRoomId(roomId, req.user.id)
    .then((result) => {
      let messages = result.rows;
      res.status(200).send(messages);
    })
    .catch((error) => res.sendStatus(400));
});

// POST REQUESTS //

// Create a new chat room between two participants
// Expects in request body: requestedId - Integer representing a user/teacher ID
// router.post('/chats', (req, res, next) => {
//   if (!req.body.requestedId) {
//     return res.sendStatus(400);
//   }
//   accountModel.getAccountTypeById(req.body.requestedId)
//     .then((result) => {
//       if (!result.rows[0]) { // Checks that the requestedId account exists
//         return res.status(400).send({
//           message: 'Account not found'
//         });
//       }
//       chatModel.createRoom(req.user.id, req.body.requestedId)
//         .then((result) => res.sendStatus(201))
//         .catch((error) => res.sendStatus(400));
//     })
//     .catch((error) => res.sendStatus(400));
// });

// Used by teachers to start a chat between 2 students
// Will automatically connect the students (if they are not already connected)
// Expects in request body:
// userId1 (INTEGER) - Student to connect
// userId2 (INTEGER) - Student to connect
// router.post('/chats/connect', (req, res, next) => {
//   if (!req.user.isTeacher) {
//     return res.sendStatus(403);
//   }
//   if (!req.body.userId1 || !req.body.userId2) {
//     return res.sendStatus(400);
//   }
//   friendModel.checkIfFriends(req.body.userId1, req.body.userId2)
//     .then((checkResult) => {
//       if (checkResult.rows[0].exists) {
//         return checkResult;
//       } else {
//         let friendPromises = [ // Connects each participant as friends
//           friendModel.createFriend(req.body.userId1, req.body.userId2),
//           friendModel.createFriend(req.body.userId2, req.body.userId1)
//         ];
//         return Promise.all(friendPromises)
//           .catch((error) => res.sendStatus(400));
//       }
//     })
//     .then((friendResult) => chatModel.createRoom(req.body.userId1, req.body.userId2))
//     .then((roomResult) => res.sendStatus(201))
//     .catch((error) => res.sendStatus(400));
// });

// Post a message to a chat room
// Expects in request body:
// roomId - Integer representing a chat room ID
// message - Message to send (1000 character limit)
router.post('/chats/messages', (req, res, next) => {
  if (!req.body.roomId || !req.body.message) {
    return res.sendStatus(400);
  }
  let roomId = parseInt(req.body.roomId);
  chatModel.postMessage(roomId, req.user.id, req.body.message)
    .then((result) => res.sendStatus(201))
    .catch((error) => res.sendStatus(400));
});


module.exports = router;

const express = require('express');
const router = express.Router();
const model = require('../models/accountChatModel.js');

// GET REQUESTS //

// Get a list of chats for the authenticated user / teacher
router.get('/chats', (req, res, next) => {
  let requesterId = 0; // TODO: SET THIS TO THE RESULT OF AUTHENTICATING THE USER
  model.getRoomsByAccountId(requesterId)
    .then((result) => {
      let rooms = result.rows;
      rooms.length > 0 ?
        res.status(200).send(rooms) :
        res.sendStatus(404)
    })
    .catch((error) => res.status(404).send(error));
});

// Get a list of messages in the provided roomId for the authenticated user / teacher
// Expects in request query: roomId - Integer representing a chat room ID
router.get('/chats/messages', (req, res, next) => {
  if (!req.query.roomId) {
    res.sendStatus(404);
    return;
  }
  let requesterId = 0; // TODO: SET THIS TO THE RESULT OF AUTHENTICATING THE USER
  model.getMessagesByRoomId(req.query.roomId, requesterId)
    .then((result) => {
      let messages = result.rows;
      messages.length > 0 ?
        res.status(200).send(messages) :
        res.sendStatus(404)
    })
    .catch((error) => res.status(404).send(error));
});

// POST REQUESTS //

// Create a new chat room between two participants
// Expects in request body: requestedId - Integer representing a user/teacher ID
router.post('/chats', (req, res, next) => {
  if (!req.body.requestedId) {
    res.sendStatus(400);
    return;
  }
  let requesterId = 0; // TODO: SET THIS TO THE RESULT OF AUTHENTICATING THE USER
  model.createRoom(requesterId, req.body.requestedId)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => res.status(400).send(error));
});

// Post a message to a chat room
// Expects in request body:
// roomId - Integer representing a chat room ID
// message - Message to send (1000 character limit)
router.post('/chats/messages', (req, res, next) => {
  if (!req.body.roomId || !req.body.message) {
    res.sendStatus(400);
    return;
  }
  let requesterId = 0; // TODO: SET THIS TO THE RESULT OF AUTHENTICATING THE USER
  model.postMessage(req.body.roomId, requesterId, req.body.message)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => res.status(400).send(error));
});


module.exports = router;

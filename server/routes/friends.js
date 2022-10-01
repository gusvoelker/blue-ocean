const express = require('express');
const router = express.Router();
const model = require('../models/friendModel.js');

router.get('/friend', (req, res, next) => {
  res.sendStatus(200); //TODO:
});


// req.body.user1 - Integer
// req.body.user2 - Integer
router.post('/friend', (req, res, next) => {
  let connection = {
    user1: req.body.user1,
    user2: req.body.user2,
  }
  model.createFriend(connection)
    .then((connectionID) => {
      res.status(201).send(connectionID);
    })
    .catch((error) => res.status(400).send(error));
});

//accept friend status
//req.query.connectionID
router.put('/friend', (req, res, next) => {
  model.acceptFriend(req.query.connectionID)
    .then(() => {
      res.sendStatus(202);
    })
    .catch((error) => res.status(400).send(error));
});

//delete friend or deny friend request
//req.query.connectionID
router.delete('/friend', (req, res, next) => {
  model.deleteFriend(req.query.connectionID)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => res.status(400).send(error));
});


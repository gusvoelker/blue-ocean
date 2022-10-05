const express = require('express');
const router = express.Router();
const friendModel = require('../models/friendModel.js');
const accountModel = require('../models/accountModel.js');

router.get('/friend', (req, res, next) => {
  let requesterId = req.query.id || req.user.id;
  friendModel.findFriends(requesterId)
    .then(({rows}) => {
      res.status(200).send(rows);
    })
    .catch((error) => res.sendStatus(400));
});


// req.body.requestedId - Integer (receiver account id)
router.post('/friend', (req, res, next) => {
  let requesterId = req.user.id;
  accountModel.getAccountTypeById(req.body.requestedId)
    .then((result) => {
      if (!result.rows[0]) { // Checks that the requestedId account exists
        res.status(400).send({
          message: 'Provided accountId not found'
        });
        return;
      }
      if (result.rows[0].is_teacher !== req.user.isTeacher) { // Checks that the requester and requesting are of the same type
        res.status(403).send({
          message: 'Students and teachers can not be friends!'
        });
        return;
      }
      friendModel.requestFriend(requesterId, req.body.requestedId)
        .then((connectionID) => {
          res.status(201).send({
            message: 'Friend request sent',
            connectionID
          });
        })
        .catch((error) => res.sendStatus(400));
    })
    .catch((error) => res.sendStatus(400));

});

//accept friend status
//req.query.idToAccept
router.put('/friend', (req, res, next) => {
  let requesterId = req.user.id;
  friendModel.acceptFriend(requesterId, req.query.idToAccept)
    .then(() => friendModel.createFriend(requesterId, req.query.idToAccept))
    .then((connectionID) => res.status(202).send(connectionID))
    .catch((error) => res.sendStatus(400));
});

//delete friend or deny friend request
//req.query.friend_id
router.delete('/friend', (req, res, next) => {
  let requesterId = req.user.id;
  friendModel.deleteFriend(requesterId, req.query.friend_id)
    .then(res.sendStatus(204))
    .catch((error) => res.sendStatus(400));
});

module.exports = router;



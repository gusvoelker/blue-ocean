const express = require('express');
const router = express.Router();
const model = require('../models/friendModel.js');
const accountModel = require('../models/accountModel.js');

router.get('/friend', (req, res, next) => {
  let requesterId = req.user.id;
  model.findFriends(requesterId)
  .then(({rows}) => {
    res.status(200).send(rows);
  })
  .catch((error) => res.status(400).send(error));
});


// req.body.requestedId - Integer (receiver account id)
router.post('/friend', (req, res, next) => {
  let requesterId = req.user.id;
  accountModel.getAccountTypeById(req.body.requestedId)
    .then((result) => {
      if (result.rows[0].is_teacher !== req.user.isTeacher) { // Checks that the requester and requesting are of the same type
        res.status(403).send({
          message: 'Students and teachers can not be friends!'
        });
        return;
      }
      return model.requestFriend(requesterId, req.body.requestedId);
    })
    .then((connectionID) => {
      res.status(201).send({
        message: 'Friend request sent',
        connectionID
      });
    })
    .catch((error) => console.log(error));

});

//accept friend status
//req.query.idToAccept
router.put('/friend', (req, res, next) => {
  let requesterId = req.user.id;
  model.acceptFriend(requesterId, req.query.idToAccept)
    .then(() => {
      model.createFriend(requesterId, req.query.idToAccept)
      .then((connectionID) => {
        res.status(202).send(`${connectionID}`)
      })
    })
    .catch((error) => res.status(400).send(error));
});

//delete friend or deny friend request
//req.query.friend_id
router.delete('/friend', (req, res, next) => {
  let requesterId = req.user.id;
  model.deleteFriend(requesterId, req.query.friend_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => res.status(400).send(error));
});

module.exports = router;



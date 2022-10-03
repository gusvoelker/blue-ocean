const query = require('../db/db.js').poolQuery;


module.exports.findFriends = (requesterId) => {
  return query(`
  SELECT c.rec_account_id, a.first_name, a.last_name
  FROM connections c
  INNER JOIN accounts a ON c.rec_account_id = a.account_id
  WHERE req_account_id=${requesterId}
  AND status = true
  `)
};

module.exports.requestFriend = (requesterId, receiverId) => {
  return query(`
    INSERT INTO connections(
      req_account_id,
      rec_account_id,
      status
    ) VALUES (
      ${requesterId},
      ${receiverId},
      false
    )
    RETURNING conn_id
  `)
    .then((response) => {
      return response.rows[0].conn_id;
    })
    .catch(err => console.log(err));
};


module.exports.createFriend = (requesterId, receiverId) => {
  return query(`
    INSERT INTO connections(
      req_account_id,
      rec_account_id,
      status
    ) VALUES (
      ${requesterId},
      ${receiverId},
      true
    )
    RETURNING conn_id
  `)
    .then((response) => {
      return response.rows[0].conn_id;
    })
    .catch(err => console.log(err));
};


module.exports.acceptFriend = (requesterId, idToAccept) => {
  return query(`
    UPDATE connections
    SET status = true
    WHERE req_account_id = ${idToAccept}
    AND rec_account_id = ${requesterId}
  `);
};

module.exports.deleteFriend = (requesterId, friend_id) => {
  return query(`
    DELETE FROM connections
    WHERE req_account_id = ${requesterId}
    AND rec_account_id = ${friend_id}
  `);
};
const query = require('../db/db.js').poolQuery;

// NOTE: This works without needing to check both ways
// due to accepting a friend request creating 2 records, one each way
// Returns a single row with an 'exists' property, i.e. result.row[0].exists
module.exports.checkIfFriends = (accountId1, accountId2) => {
  return query(`
    SELECT EXISTS (
      SELECT conn_id FROM connections
        WHERE req_account_id=${accountId1}
          AND rec_account_id=${accountId2}
          AND status = true
    )
  `);
};

module.exports.findFriends = (requesterId) => {
  return query(`
  SELECT rec_account_id FROM connections
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
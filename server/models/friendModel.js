const db = require('../db/db.js');

// NOTE: This works without needing to check both ways
// due to accepting a friend request creating 2 records, one each way
// Returns a single row with an 'exists' property, i.e. result.rows[0].exists
module.exports.checkIfFriends = (accountId1, accountId2) => {
  return db.query(`
    SELECT EXISTS (
      SELECT conn_id FROM connections
        WHERE req_account_id=${accountId1}
          AND rec_account_id=${accountId2}
          AND status = true
    )
  `);
};

module.exports.findFriendRequests = (requesterId) => {
  return db.query(`
  SELECT c.req_account_id AS account_id, a.first_name, a.last_name
  FROM connections c
  INNER JOIN accounts a ON c.req_account_id = a.account_id
    WHERE rec_account_id=${requesterId}
      AND status = false
  `);
};

module.exports.findFriends = (requesterId) => {
  return db.query(`
  SELECT rec_account_id AS account_id FROM connections
    WHERE req_account_id=${requesterId}
      AND status = true
  `);
};

module.exports.findFriendsInfo = (requesterId) => {
  return db.query(`
  SELECT rec_account_id AS account_id, first_name, last_name, email, avatar_url, is_teacher
  FROM connections, accounts
    WHERE req_account_id=${requesterId}
      AND status = true
      AND rec_account_id = accounts.account_id
  `);
};

module.exports.requestFriend = (requesterId, receiverId) => {
  return db.query(`
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
    });
};


module.exports.createFriend = (requesterId, receiverId) => {
  return db.query(`
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
    });
};


module.exports.acceptFriend = (requesterId, idToAccept) => {
  return db.query(`
    UPDATE connections
    SET status = true
    WHERE req_account_id = ${idToAccept}
    AND rec_account_id = ${requesterId}
  `);
};

module.exports.deleteFriend = (requesterId, friend_id) => {
  return db.query(`
    DELETE FROM connections
    WHERE req_account_id = ${requesterId}
    AND rec_account_id = ${friend_id}
  `);
};

module.exports.deletePendingFriend = (requesterId, friend_id) => {
  return db.query(`
    DELETE FROM connections
    WHERE req_account_id = ${friend_id}
    AND rec_account_id = ${requesterId}
  `);
};
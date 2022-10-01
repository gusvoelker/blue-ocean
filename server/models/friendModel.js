const query = require('../db/db.js').poolQuery;

// connection.user1
// connection.user2
module.exports.findFriends = (user_id) => {
  //TODO: figure out which id to return
  return query(`
  SELECT *
  FROM connections
  WHERE conn_id=${user_id}
  `)
};

module.exports.createFriend = (connection) => {
  return query(`
    INSERT INTO connections(
      req_account_id,
      rec_account_id,
      status
    ) VALUES (
      ${connection.user1},
      ${connection.user2},
      0
    )
    RETURNING conn_id
  `)
    .then((response) => {
      if (response.name === 'error') {
        throw new Error(response.message);
      }
      return response.rows[0].account_id;
    });
};

module.exports.acceptFriend = (connection_id) => {
  return query(`
    UPDATE connections
    SET status = 1
    WHERE conn_id = ${connection_id}
  `);
};

module.exports.deleteFriend = (connection_id) => {
  return query(`
    DELETE FROM connections
    WHERE conn_id = ${connection_id}
  `);
};
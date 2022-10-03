const query = require('../db/db.js').poolQuery;


module.exports.findFriends = (user_id) => {
  return query(`
  SELECT c.rec_account_id, a.first_name, a.last_name
  FROM connections c
  INNER JOIN accounts a ON c.rec_account_id = a.account_id
  WHERE req_account_id=${user_id}
  AND status = true
  `)
};

module.exports.createFriend = (connection) => {
  console.log(connection);
  return query(`
    INSERT INTO connections(
      req_account_id,
      rec_account_id,
      status
    ) VALUES (
      ${connection.user1},
      ${connection.user2},
      false
    )
    RETURNING conn_id
  `)
    .then((response) => {
      console.log(response.rows[0].conn_id)
      return response.rows[0].conn_id;
    })
    .catch(err => console.log(err));
};

module.exports.acceptFriend = (connection_id) => {
  return query(`
    UPDATE connections
    SET status = true
    WHERE conn_id = ${connection_id}
  `);
};

module.exports.deleteFriend = (connection_id) => {
  return query(`
    DELETE FROM connections
    WHERE conn_id = ${connection_id}
  `);
};
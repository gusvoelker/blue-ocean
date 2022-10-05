const db = require("../db/db.js")


//simple
module.exports.findMeetings = (req_account) => {
  console.log("account is this", req_account)
  return db.query(`
    SELECT m.conn_id,
      m.req_account_id,
      m.rec_account_id,
      m.start_time,
      a.first_name,
      a.last_name,
      m.status
      FROM
        meetings m
      LEFT JOIN accounts a
      ON m.rec_account_id = a.account_id
      WHERE
        req_account_id='${req_account}'
        AND start_time > now()
      ORDER BY start_time
  `);
}

module.exports.requestMeeting = (requesterId, receiverId, meetingDateTime) => {
  console.log(requesterId, receiverId, meetingDateTime)
  return db.query(`
    INSERT INTO meetings(
      req_account_id,
      rec_account_id,
      start_time
    ) VALUES (
      '${description}',
      '${requesterId}',
      '${receiverId}',
      '${meetingDateTime}'
    )
    RETURNING conn_id
  `)
};


module.exports.acceptMeeting = () => {
  return db.query(`

  `)
};


module.exports.deleteMeeting = (requesterId, receiverId, meetingDateTime) => {
  return query(`
  `)
};

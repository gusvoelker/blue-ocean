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

module.exports.findMeetingsRequests = (rec_account) => {
  console.log("RECEIVING ACCOUNT IS ", rec_account)
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
        rec_account_id='${rec_account}'
        AND start_time > now()
        --AND m.status = false
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
      '${requesterId}',
      '${receiverId}',
      '${meetingDateTime}'
    )
    RETURNING conn_id
  `)
};


module.exports.createMeeting = (requesterId, receiverId, meetingDateTime) => {
  return db.query(`
    INSERT INTO meetings(
      req_account_id,
      rec_account_id,
      start_time,
      status
    ) VALUES (
      '${receiverId}',
      '${requesterId}',
      '${meetingDateTime}',
      true
    )
    RETURNING conn_id
  `)
};

module.exports.acceptMeeting = (requesterId, receiverId, meetingDateTime) => {
  //console.log(requesterId, receiverId, meetingDateTime)
  return db.query(`
    UPDATE meetings
    SET status = true
    WHERE req_account_id = '${requesterId}'
    AND rec_account_id = '${receiverId}'
    AND start_time = '${meetingDateTime}'
    RETURNING *
    ;
  `)
};

module.exports.deleteMeeting1 = (requesterId, receiverId, meetingDateTime) => {
  return db.query(`
  DELETE FROM meetings
  WHERE req_account_id = ${requesterId}
  AND rec_account_id = ${receiverId}
  AND start_time = '${meetingDateTime}'
  `)
};

module.exports.deleteMeeting2 = (requesterId, receiverId, meetingDateTime) => {
  return db.query(`
  DELETE FROM meetings
  WHERE req_account_id = ${receiverId}
  AND rec_account_id = ${requesterId}
  AND start_time = '${meetingDateTime}'
  `)
};
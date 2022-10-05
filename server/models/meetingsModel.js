const query = require("../db/db.js").poolQuery;

//simple
module.exports.findMeetings = () => {
  return query(`
    SELECT m.conn_id,
      m.req_account_id,
      m.rec_account_id,
      a.first_name,
      a.last_name,
      m.status
      FROM
        meetings m
      LEFT JOIN accounts a
      ON m.rec_account_id = a.account_id
      WHERE
        --req_account_id=${accountId1}
        start_time > now()
        AND status = true
      ORDER BY start_time
    )
  `);
}

// module.exports.requestMeeting = (description, requesterId, receiverId, meetingDateTime) => {
//   return query(`
//     INSERT INTO meetings(
//       description,
//       req_account_id,
//       rec_account_id,
//       start_time
//     ) VALUES (
//       ${description},
//       ${requesterId},
//       ${receiverId},
//       ${meetingDateTime}
//     )
//     RETURNING conn_id
//   `)
// };


// module.exports.acceptMeeting = (requesterId, receiverId, meetingDateTime) => {
//   return query(`
//   `)
// };


// module.exports.deleteMeeting = (requesterId, receiverId, meetingDateTime) => {
//   return query(`
//   `)
// };

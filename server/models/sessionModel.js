const query = require('../db/db.js').poolQuery;

// accountId - Integer
// sessionId - String (hash)
// module.exports.createSession = (accountId, sessionId) => {
//   return query(`
//     INSERT INTO session(
//       session_id,
//       account_id,
//       created_at
//     ) VALUES (
//       '${hash}',
//       ${accountId},
//       ${/*TODO: GET CURRENT TIME*/}
//     )
//     RETURNING session_id
//   `)
//     .then((createRes) => {
//       if (createRes.name === 'error') {
//         throw new Error(createRes.message);
//       }
//       return createRes.rows[0].session_id;
//     });
// };

// // sessionId - String (hash)
// module.exports.getAccountIdBySessionId = (sessionId) => {
//   return query(`
//     SELECT account_id
//     FROM session
//       WHERE session_id = '${sessionId}'
//   `);
// };

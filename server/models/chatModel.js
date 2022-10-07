const db = require('../db/db.js');
const friendModel = require('./friendModel.js');

module.exports.getRoomsByAccountId = (accountId, sort='room_id DESC') => {
  return db.query(`
    SELECT room_id
      FROM account_room
      WHERE account_id_1=${accountId}
        OR account_id_2=${accountId}
    ORDER BY ${sort}
  `);
};


module.exports.getRoomIdByParticipants = (accountId, requestedAccountId) => {
  return db.query(`
    SELECT room_id FROM account_room
      WHERE
      (account_id_1=${accountId} AND account_id_2=${requestedAccountId})
      OR
      (account_id_2=${accountId} AND account_id_1=${requestedAccountId})
  `);
};

// Verifies that the requesting account (accountId) has permission to read from this room's messages
// By only returning messages from rooms for which the accountId is a participant
module.exports.getMessagesByRoomId = (roomId, accountId, sort='created_at DESC') => {
  return db.query(`
    SELECT
      account_message.message_id,
      account_message.account_id,
      account_message.message,
      account_message.created_at
        FROM account_message, account_room
        WHERE account_message.room_id=${roomId}
          AND account_room.room_id=${roomId}
          AND (account_room.account_id_1=${accountId} OR account_room.account_id_2=${accountId})
    ORDER BY ${sort}
  `);
};

module.exports.createRoom = (participantOneId, participantTwoId) => {
  return friendModel.checkIfFriends(participantOneId, participantTwoId)
    .then((result) => {
      if (!result.rows[0].exists) {
        throw new Error('Can\'t create rooms between non-connected users'); // TODO: Ensure this is handled properly
      }
      return db.query(`
        INSERT INTO account_room (
          account_id_1,
          account_id_2
        ) VALUES (
          ${participantOneId},
          ${participantTwoId}
        )
        RETURNING room_id
      `);
    })
    .then((createRes) => {
      if (createRes.name === 'error') {
        throw new Error(createRes.message);
      }
      let roomId = createRes.rows[0].room_id;
      return roomId;
    });
};

module.exports.postMessage = (roomId, accountId, message) => {
  return db.query(`
    INSERT INTO account_message(
      room_id,
      account_id,
      message
    ) VALUES (
      ${roomId},
      ${accountId},
      '${message}'
    )
  `);
};

// P2P REWRITE AAAAAAAA //

// module.exports.getMessagesP2P = (senderId, message) => {
//   return db.query(`
//     SELECT message, created_at, sender_account_id, recipient_account_id
//     FROM account_message(
//       sender_account_id,
//       recipient_account_id,
//       message
//     ) VALUES (
//       ${roomId},
//       ${accountId},
//       '${message}'
//     )
//   `);
// };

// module.exports.postMessageP2P = (senderId, receptId, message) => {
//   return db.query(`
//     INSERT INTO account_message(
//       sender_account_id,
//       recipient_account_id,
//       message
//     ) VALUES (
//       ${roomId},
//       ${accountId},
//       '${message}'
//     )
//   `);
// };

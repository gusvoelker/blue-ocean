const query = require('../db/db.js').poolQuery;

// account.email
// account.passwordHash
// account.passwordSalt
// account.firstName
// account.lastName
// account.isTeacher
module.exports.createAccount = (account) => {
  return query(`
    INSERT INTO account(
      email,
      pw_hash,
      salt,
      first_name,
      last_name,
      is_teacher
    ) VALUES (
      '${account.email}',
      '${account.passwordHash}',
      '${account.passwordSalt}',
      '${account.firstName}',
      '${account.lastName}',
      ${account.isTeacher}
    )
    RETURNING account_id
  `)
    .then((createRes) => {
      if (createRes.name === 'error') {
        throw new Error(createRes.message);
      }
      return createRes.rows[0].account_id;
    });
};

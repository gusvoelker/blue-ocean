const query = require('../db/db.js').poolQuery;

module.exports.getAccountInfo = (accountId) => {
  return query(`
    SELECT
      email,
      first_name,
      last_name,
      is_teacher
    FROM accounts
      WHERE account_id=${accountId}
  `);
};

// account.email
// account.passwordHash
// account.passwordSalt
// account.firstName
// account.lastName
// account.isTeacher
// TODO: Remove salt field, as it will be handled by bcrypt / passport (?)
module.exports.createAccount = (account) => {
  return query(`
    INSERT INTO accounts(
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

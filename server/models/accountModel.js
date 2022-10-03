const query = require('../db/db.js').poolQuery;

// Should be used by client to retrieve a list of accounts on the website
module.exports.getAllAccountInfo = () => {
  return query(`
    SELECT
      account_id,
      email,
      first_name,
      last_name,
      is_teacher
    FROM accounts
  `);
};

// Should be used by client to retrieve a list of teacher / student accounts on the website
// Expects isTeacher - Boolean
module.exports.getAccountsByType = (isTeacher) => {
  return query(`
    SELECT
      account_id,
      email,
      first_name,
      last_name
    FROM accounts
      WHERE is_teacher=${isTeacher}
  `);
};

module.exports.getPublicAccountInfoById = (accountId) => {
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

module.exports.getAccountAuthByEmail = (email) => {
  return query(`
    SELECT
      account_id,
      pw_hash
    FROM accounts
      WHERE email='${email}'
  `);
};

// TODO: Delete(?) Check if needed by auth
module.exports.getPasswordByEmail = (email) => {
  return query(`
    SELECT
      pw_hash
    FROM accounts
      WHERE email='${email}'
  `);
};

// account.email
// account.passwordHash
// account.firstName
// account.lastName
// account.isTeacher
module.exports.createAccount = (account) => {
  return query(`
    INSERT INTO accounts(
      email,
      pw_hash,
      first_name,
      last_name,
      is_teacher
    ) VALUES (
      '${account.email}',
      '${account.passwordHash}',
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

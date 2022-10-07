const db = require("../db/db.js");

module.exports.getAllAccountInfo = () => {
  return db.query(`
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
  return db.query(`
    SELECT
      account_id,
      email,
      first_name,
      last_name
    FROM accounts
      WHERE is_teacher=${isTeacher}
  `);
};

module.exports.getAccountTypeById = (accountId) => {
  return db.query(`
    SELECT
      is_teacher
    FROM accounts
      WHERE account_id=${accountId}
  `);
};

module.exports.getPublicAccountInfoById = (accountId) => {
  return db.query(`
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
  return db.query(`
    SELECT
      account_id,
      pw_hash,
      is_teacher
    FROM accounts
      WHERE email='${email}'
  `);
};

// TODO: Delete(?) Check if needed by auth
// It is used in one place in auth.js but it could be replaced by getAccountAuthByEmail
module.exports.getPasswordByEmail = (email) => {
  return db.query(`
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
  return db.query(`
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
    RETURNING account_id, is_teacher
  `)
    .then((createRes) => {
      if (createRes.name === "error") {
        throw new Error(createRes.message);
      }
      return createRes.rows[0];
    });
};

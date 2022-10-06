const db = require('../db/db.js');

// TODO: Refactor input from using template strings to using parameterized values (i.e. $1, $2), requires change to be made to the query helper

module.exports.getExample = (sort, count) => {
  return db.query(`
    SELECT ${'field'}
      FROM ${'table'}
    ORDER BY ${sort}
    LIMIT ${count || 10}
  `);
};

module.exports.getByIdExample = (id) => {
  return db.query(`
    SELECT ${'field'}
      FROM ${'table'}
      WHERE id=${id}
  `);
};

module.exports.insertExample = (data) => {
  return db.query(`
    INSERT INTO ${'table'} (${'firstField'}, ${'secondField'})
      VALUES (${data.firstValue}, ${data.secondValue})
    RETURNING data_id
  `);
};

module.exports.updateExample = (id, newData) => {
  return db.query(`
    UPDATE ${'table'}
      SET ${'field'} = ${newData}
      WHERE id=${id}
  `);
};

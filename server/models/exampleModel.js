const query = require('../db/db.js').poolQuery;

// TODO: Refactor input from using template strings to using parameterized values (i.e. $1, $2), requires change to be made to the query helper

module.exports.getExample = (sort, count) => {
  return query(`
    SELECT ${'field'}
      FROM ${'table'}
    ORDER BY ${sort}
    LIMIT ${count || 10}
  `);
};

module.exports.getByIdExample = (id) => {
  return query(`
    SELECT ${'field'}
      FROM ${'table'}
      WHERE id=${id}
  `);
};

module.exports.insertExample = (data) => {
  return query(`
    INSERT INTO ${'table'} (${'firstField'}, ${'secondField'})
      VALUES (${data.firstValue}, ${data.secondValue})
    RETURNING review_id
  `);
};

module.exports.updateExample = (id, newData) => {
  return query(`
    UPDATE ${'table'}
      SET ${'field'} = ${newData}
      WHERE id=${id}
  `);
};

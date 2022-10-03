const query = require('../db/db.js').poolQuery;

// TODO: Refactor input from using template strings to using parameterized values (i.e. $1, $2), requires change to be made to the query helper

module.exports.AddClassName = async ({className, teacherId}) => {
  console.log('in AddclassName ', className, teacherId)
  return
  // return query(`
  //   SELECT ${'field'}
  //     FROM ${'table'}
  //   ORDER BY ${sort}
  //   LIMIT ${count || 10}
  // `);
};

module.exports.AddStudents = async (records) => {
  console.log('records', records)
  return 'success'
  // return query(`
  //   SELECT ${'field'}
  //     FROM ${'table'}
  //     WHERE id=${id}
  // `);
};

module.exports.insertExample = (data) => {
  return query(`
    INSERT INTO ${'table'} (${'firstField'}, ${'secondField'})
      VALUES (${data.firstValue}, ${data.secondValue})
    RETURNING data_id
  `);
};

module.exports.updateExample = (id, newData) => {
  return query(`
    UPDATE ${'table'}
      SET ${'field'} = ${newData}
      WHERE id=${id}
  `);
};

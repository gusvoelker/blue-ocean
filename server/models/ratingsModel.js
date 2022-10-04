const query = require('../db/db.js').poolQuery;

// TODO: Implement
// Should output a row for each language and the average rating of each row
// May need to convert ratings enum to integer
module.exports.getRatingsAvgByStudentId = (studentId) => {
  return query(`
    SELECT rated_lang_id,
      FROM ${'table'}
    ORDER BY ${sort}
    LIMIT ${count || 10}
  `);
};

// TODO: Ensure ratingStudentId or ratedStudentId are not teacher accounts
module.exports.addRating = (ratingStudentId, ratedStudentId, rating, languageId) => {
  return query(`
    INSERT INTO ${'table'} (${'firstField'}, ${'secondField'})
      VALUES (${data.firstValue}, ${data.secondValue})
    RETURNING data_id
  `);
};

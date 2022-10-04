const db = require('../db/db.js');

module.exports.getRatingsAvgByStudentId = (studentId) => {
  return db.query(`
    SELECT rated_lang_id, AVG(rating)::NUMERIC(10,2)
      FROM ratings
        WHERE rated_account_id = ${studentId}
      GROUP BY rated_lang_id
  `);
};

// TODO: Ensure ratingStudentId or ratedStudentId are not teacher accounts
module.exports.addRating = (ratingStudentId, ratedStudentId, languageId, rating) => {
  return db.query(`
    INSERT INTO ratings (
      rating_account_id,
      rated_account_id,
      rated_lang_id,
      rating
    ) VALUES (
      ${ratingStudentId},
      ${ratedStudentId},
      ${languageId},
      ${rating}
    )
  `);
};

const db = require('../db/db.js');

const getLangNameById = (id) => {
  return db.query(`
    SELECT lang_name
      FROM languages
      WHERE lang_id=${id}
  `);

};

module.exports.getAllLanguages = (sort='lang_name desc') => {
  return db.query(`
    SELECT *
      FROM languages
    ORDER BY ${sort}
  `);
};

module.exports.getTeachersByTaughtLanguageId = (languageId) => {
  return db.query(`
    SELECT teacher_id, lang_id, taught_level
      FROM taught_languages
        WHERE lang_id = ${languageId}
  `);
};

module.exports.getTaughtLanguagesByTeacherId = (teacherId, sort='lang_name desc') => {
  return db.query(`
    SELECT languages.lang_id, languages.lang_name, taught_languages.taught_level
      FROM languages, taught_languages
      WHERE languages.lang_id = taught_languages.lang_id
        AND taught_languages.teacher_id = ${teacherId}
    ORDER BY ${sort}
  `);
};

module.exports.getKnownLanguagesByUserId = (userId, sort='lang_name desc') => {
  return db.query(`
    SELECT languages.lang_id, languages.lang_name
      FROM languages, known_languages
      WHERE languages.lang_id = known_languages.lang_id
        AND known_languages.user_id = ${userId}
    ORDER BY ${sort}
  `);
};

module.exports.getDesiredLanguagesByUserId = (userId, sort='lang_name desc') => {
  return db.query(`
    SELECT languages.lang_id, languages.lang_name
      FROM languages, desired_languages
      WHERE languages.lang_id = desired_languages.lang_id
        AND desired_languages.user_id = ${userId}
    ORDER BY ${sort}
  `);
};

module.exports.insertLanguage = (language) => {
  return db.query(`
    INSERT INTO languages(lang_name)
      VALUES ('${language}')
  `);
};

module.exports.insertTaughtLanguageById = (teacherId, langId, taughtLevel) => {
  return db.query(`
    INSERT INTO taught_languages(teacher_id, lang_id, taught_level)
      SELECT ${teacherId}, ${langId}, '${taughtLevel}'
      WHERE NOT EXISTS (
        SELECT teacher_id, lang_id
          FROM taught_languages
          WHERE teacher_id = ${teacherId}
            AND lang_id = ${langId}
      )
  `);
};

module.exports.insertKnownLanguageById = (userId, langId) => {
  return db.query(`
    INSERT INTO known_languages(user_id, lang_id)
      SELECT ${userId}, ${langId}
      WHERE NOT EXISTS (
        SELECT user_id, lang_id
          FROM known_languages
          WHERE user_id = ${userId}
            AND lang_id = ${langId}
      )
  `);
};

module.exports.insertDesiredLanguageById = (userId, langId) => {
  return db.query(`
    INSERT INTO desired_languages(user_id, lang_id)
      SELECT ${userId}, ${langId}
      WHERE NOT EXISTS (
        SELECT user_id, lang_id
          FROM desired_languages
          WHERE user_id = ${userId}
            AND lang_id = ${langId}
      )
  `);
};

// BENCHED //

// module.exports.insertTaughtLanguageByName = (teacherId, taughtLevel, language) => {
//   return db.query(`
//     INSERT INTO taught_languages(teacher_id, lang_id, taught_level)
//       VALUES (
//         ${teacherId},
//         (SELECT lang_id
//           FROM languages
//           WHERE lang_name='${language}'),
//         '${taughtLevel}'
//       )
//   `);
// };

// module.exports.insertKnownLanguageByName = (userId, language) => {
//   return db.query(`
//     INSERT INTO known_languages(user_id, lang_id)
//       VALUES (
//         ${userId},
//         (SELECT lang_id
//           FROM languages
//           WHERE lang_name='${language}')
//       )
//   `);
// };

// module.exports.insertDesiredLanguageByName = (userId, language) => {
//   return db.query(`
//     INSERT INTO desired_languages(user_id, lang_id)
//       VALUES (
//         ${userId},
//         (SELECT lang_id
//           FROM languages
//           WHERE lang_name='${language}')
//       )
//   `);
// };

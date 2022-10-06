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

// TODO: Only allow people to insert if the lang_id doesn't already exist for them
module.exports.insertTaughtLanguage = (teacherId, taughtLevel, language) => {
  return db.query(`
    INSERT INTO taught_languages(teacher_id, lang_id, taught_level)
      VALUES (
        ${teacherId},
        (SELECT lang_id
          FROM languages
          WHERE lang_name='${language}'),
        '${taughtLevel}'
      )
  `);
};

// TODO: Only allow people to insert if the lang_id doesn't already exist for them
module.exports.insertKnownLanguage = (userId, language) => {
  return db.query(`
    INSERT INTO known_languages(user_id, lang_id)
      VALUES (
        ${userId},
        (SELECT lang_id
          FROM languages
          WHERE lang_name='${language}')
      )
  `);
};

// TODO: Only allow people to insert if the lang_id doesn't already exist for them
module.exports.insertDesiredLanguage = (userId, language) => {
  return db.query(`
    INSERT INTO desired_languages(user_id, lang_id)
      VALUES (
        ${userId},
        (SELECT lang_id
          FROM languages
          WHERE lang_name='${language}')
      )
  `);
};

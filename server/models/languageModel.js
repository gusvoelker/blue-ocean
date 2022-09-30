const query = require('../db/db.js').poolQuery;

const getLangNameById = (id) => {
  return query(`
    SELECT lang_name
      FROM language
      WHERE lang_id=${id}
  `);
};

module.exports.getAllLanguages = (sort='lang_name desc') => {
  return query(`
    SELECT lang_name
      FROM language
    ORDER BY ${sort}
  `);
};

module.exports.insertTaughtLanguage = (teacherId, taughtLevel, language) => {
  return query(`
    INSERT INTO taught_languages(teacher_id, lang_id, taught_level)
      VALUES (
        ${teacherId},
        (SELECT lang_id
          FROM language
          WHERE lang_name='${language}'),
        '${taughtLevel}'
      )
  `);
};

module.exports.insertKnownLanguage = (userId, language) => {
  return query(`
    INSERT INTO known_languages(user_id, lang_id)
      VALUES (
        ${userId},
        (SELECT lang_id
          FROM language
          WHERE lang_name='${language}')
      )
  `);
};

module.exports.insertDesiredLanguage = (userId, language) => {
  return query(`
    INSERT INTO desired_languages(user_id, lang_id)
      VALUES (
        ${userId},
        (SELECT lang_id
          FROM language
          WHERE lang_name='${language}')
      )
  `);
};
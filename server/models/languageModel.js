const query = require('../db/db.js').poolQuery;

const getLangNameById = (id) => {
  return query(`
    SELECT lang_name
      FROM languages
      WHERE lang_id=${id}
  `);
};

module.exports.getAllLanguages = (sort='lang_name desc') => {
  return query(`
    SELECT *
      FROM languages
    ORDER BY ${sort}
  `);
};

module.exports.getTaughtLanguagesByTeacherId = (teacherId, sort='lang_name desc') => {
  // TODO: Change taught_lang_id to lang_id once schema is changed
  return query(`
    SELECT languages.lang_id, languages.lang_name, taught_languages.taught_level
      FROM languages, taught_languages
      WHERE languages.lang_id = taught_languages.taught_lang_id
      AND taught_languages.teacher_id = ${teacherId}
    ORDER BY ${sort}
  `);
};

module.exports.getKnownLanguagesByUserId = (userId, sort='lang_name desc') => {
  // TODO: Change known_lang_id to lang_id once schema is changed
  return query(`
    SELECT languages.lang_id, languages.lang_name
      FROM languages, known_languages
      WHERE languages.lang_id = known_languages.known_lang_id
      AND known_languages.user_id = ${userId}
    ORDER BY ${sort}
  `);
};

module.exports.getDesiredLanguagesByUserId = (userId, sort='lang_name desc') => {
  // TODO: Change desired_lang_id to lang_id once schema is changed
  return query(`
    SELECT languages.lang_id, languages.lang_name
      FROM languages, desired_languages
      WHERE languages.lang_id = desired_languages.desired_lang_id
      AND desired_languages.user_id = ${userId}
    ORDER BY ${sort}
  `);
};

module.exports.insertLanguage = (language) => {
  return query(`
    INSERT INTO languages(lang_name)
      VALUES ('${language}')
  `);
};

module.exports.insertTaughtLanguage = (teacherId, taughtLevel, language) => {
  return query(`
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

module.exports.insertKnownLanguage = (userId, language) => {
  return query(`
    INSERT INTO known_languages(user_id, lang_id)
      VALUES (
        ${userId},
        (SELECT lang_id
          FROM languages
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
          FROM languages
          WHERE lang_name='${language}')
      )
  `);
};

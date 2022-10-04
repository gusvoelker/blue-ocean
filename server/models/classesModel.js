const query = require('../db/db.js').poolQuery;


module.exports.addClass = (classObj) => {
  return query(`
  INSERT INTO classes (
    teacher_id,
    class_name
  ) VALUES (
    ${classObj.teacher_id},
    '${classObj.className}'
  )
  RETURNING class_id
`).then((response) => {
    return response.rows[0].class_id;
  })
  .catch(err => console.log(err))
};

module.exports.AddStudents = (class_id, records) =>{
  var queryText = `Select account_id, '${class_id}' FROM accounts WHERE `
  for (var i=1; i<records.length; i++) {
    queryText += `email = '${records[i][2]}' or `
  }
  queryText = queryText.slice(0, queryText.length - 4);
  return query(`
  INSERT INTO enrollments (
    account_id,
    class_id
  )
    ${queryText}
    `)
}

module.exports.findClassesByTeacher = (teacher_id) => {
  return query(`
  SELECT class_id, class_name
  FROM classes
  WHERE teacher_id = ${teacher_id}
  `)
};

module.exports.findStudentsByClass = (class_id) => {
  return query(`
  SELECT e.account_id, a.first_name, a.last_name
  FROM enrollments e
  INNER JOIN accounts a ON e.account_ID = a.account_id
  WHERE e.class_id = ${class_id}
  `)
};

module.exports.findAccountIdByEmail = (class_id) => {
  return query(`
  SELECT e.account_id, a.first_name, a.last_name
  FROM enrollments e
  INNER JOIN accounts a ON e.account_ID = a.account_id
  WHERE e.class_id = ${class_id}
  `)
};
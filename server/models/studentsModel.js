const query = require('../db/db.js').poolQuery;


module.exports.findClassesByTeacher = (teacher_id) => {
  //TODO: add classname to schema?
  return query(`
  SELECT class_id
  FROM classes
  WHERE teacher_id = ${teacher_id}
  `)
};

module.exports.findStudentsByClass = (class_id) => {
  //TODO: figure out which id to return
  return query(`
  SELECT s.*
  FROM students s
  INNER JOIN enrollments e
  ON e.student_id = s.student_id
  WHERE e.en_class_id = ${class_id}
  `)
};
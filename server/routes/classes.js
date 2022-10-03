const express = require('express');
const router = express.Router();
const model = require('../models/classesModel.js');


//Teachers need to be able to add classes
//req.body.teacher_id
//req.body.className
router.post('/classes', (req, res, next) => {
  let classObj = {
    teacher_id: req.body.teacher_id,
    className: req.body.className
  }
  model.addClass(classObj)
  .then((class_id) => {
    res.status(201).send(class_id);
  })
  .catch((error) => res.status(400).send(error));
});

//view list of classes
router.get('/classes', (req, res, next) => {
  model.findClassesByTeacher(req.query.teacher_id)
  .then(({rows}) => {
    res.status(200).send(rows);
  })
  .catch((error) => res.status(400).send(error));
});

//Add students to the class
//req.body.email
//req.body.class_id
router.post('/classes/students', (req, res, next) => {
  model.findStudentsByClass(req.query.userId)
  .then((students) => {
    res.status(200).send(students);
  })
  .catch((error) => res.status(400).send(error));
});

//view list of students in the class
//req.query.class_id
router.get('/classes/students', (req, res, next) => {
  model.findStudentsByClass(req.query.class_id)
  .then(({rows}) => {
    res.status(200).send(rows);
  })
  .catch((error) => res.status(400).send(error));
});




module.exports = router;



const express = require('express');
const router = express.Router();
const model = require('../models/studentsModel.js');

//none of this works due to schem change
router.get('/classes', (req, res, next) => {
  model.findClassesByTeacher(req.query.classID)
  .then((classes) => {
    res.status(200).send(classes);
  })
  .catch((error) => res.status(400).send(error));
});


router.get('/classes/students', (req, res, next) => {
  model.findStudentsByClass(req.query.userId)
  .then((students) => {
    res.status(200).send(students);
  })
  .catch((error) => res.status(400).send(error));
});



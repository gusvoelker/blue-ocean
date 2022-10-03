const express = require('express');
const router = express.Router();
const model = require('../models/classesModel.js');
const os = require('os')
const multer = require('multer')
const upload = multer({ dest: os.tmpdir() })
const fs = require('fs')
const {parse} = require('csv-parse')

//Teachers need to be able to add classes
//req.body.teacher_id
//req.body.className
router.post('/classes', (req, res, next) => {
  let classObj = {
    teacher_id: req.body.teacher_id,
    className: req.body.className,
  }
  model.addClass(classObj)
  .then((class_id) => {
    var classId = '2';
    console.log('after addClass', class_id)
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
router.post('/classes/students',  upload.single('file'), (req, res, next) =>{
  const file = req.file;
  const class_id = req.body.class_id;
  const data = fs.readFileSync(file.path)
  async function updateRecords(data) {
    parse(data, (err, records) => {
      if (err) {
        console.error(err)
        return res.status(400).json({ success: false, message: 'An error occurred' })
      } else {
        model.AddStudents(class_id, records).then(()=>{
          res.send(204)
        }).catch((err)=>{res.sendStatus(500).send(err)})
      }
    })
  }
  updateRecords(data)

})
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



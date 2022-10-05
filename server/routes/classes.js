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
  console.log('classObj in router ', classObj)
  model.addClass(classObj)
  .then((class_id) => {
    console.log('after addClass', class_id)
    res.status(201).send({class_id});
  })
  .catch((error) => res.sendStatus(400));
});

//view list of classes
router.get('/classes', (req, res, next) => {

  model.findClassesByTeacher(req.query.teacher_id)
  .then(({rows}) => {
    res.status(200).send(rows);
  })
  .catch((error) => res.sendStatus(400));
});

//Add students to the class
//req.body.email
//req.body.class_id
router.post(`/classes/students/*`,  upload.single('file'), (req, res, next) =>{
  const class_id = req.url.split('/')[3]
  const file = req.file;
  const data = fs.readFileSync(file.path)
  async function updateRecords(data) {
    parse(data, (err, records) => {
      if (err) {
        console.error(err)
        return res.status(400).json({ success: false, message: 'An error occurred' })
      } else {
        model.AddStudents(class_id, records).then(()=>{
          res.sendStatus(204)
        }).catch((err)=>{res.sendStatus(500)})
      }
    })
  }
  updateRecords(data)

})
//view list of students in the class
//req.query.class_id
router.get('/classes/students', (req, res, next) => {
  console.log(req.query)
  model.findStudentsByClass(req.query.class_id)
  .then(({rows}) => {
    res.status(200).send(rows);
  })
  .catch((error) => res.sendStatus(400));
});




module.exports = router;


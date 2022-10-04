const express = require('express');
const router = express.Router();
const model = require('../models/tempClassesModel.js');
const os = require('os')
const multer = require('multer')
const upload = multer({ dest: os.tmpdir() })
const fs = require('fs')
const {parse} = require('csv-parse')

//npm install csv-parse, multer

router.post('/classes', (req, res, next)=>{
  let classObj = {
    teacherId: req.body.teacherId,
    className: req.body.className,
  }
  console.log('class object ', classObj)
  model.AddClassName(classObj).then((results)=>{
    console.log('after AddCLassName')
    // var classId = results.rows[0]['id']
    var classId = '2';
    res.sendStatus(200).send({classId})
  }).catch((err)=>{res.sendStatus(400).send(err)})
})

router.post('/classes/students',  upload.single('file'), (req, res, next) =>{
  const file = req.file;
  const data = fs.readFileSync(file.path)
  async function updateRecords(data) {
    parse(data, (err, records) => {
      if (err) {
        console.error(err)
        return res.status(400).json({ success: false, message: 'An error occurred' })
      } else {
        model.AddStudents(records).then(()=>{
          res.send(204)
        }).catch((err)=>{res.sendStatus(500).send(err)})
      }
    })
  }

})

module.exports = router;

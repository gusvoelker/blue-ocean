const express = require('express');
const router = express.Router();
const model = require('../models/exampleModel.js');

router.get('/example', (req, res, next) => {
  res.sendStatus(200);
});

router.post('/example', (req, res, next) => {
  res.sendStatus(201);
});

router.put('/example', (req, res, next) => {
  res.sendStatus(204);
});

router.patch('/example', (req, res, next) => {
  res.sendStatus(204);
});

router.delete('/example', (req, res, next) => {
  res.sendStatus(204);
});

module.exports = router;

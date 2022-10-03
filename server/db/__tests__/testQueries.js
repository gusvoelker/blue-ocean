const query = require('../db.js').poolQuery;
const accountModel = require('../../models/accountModel.js');
const languageModel = require('../../models/languageModel.js');
const chatModel = require('../../models/chatModel.js');

// Will eventually replace this with jest testing in queries.test.js, but for now...

// ACCOUNTS //

// CREATE ACCOUNTS
(async () => {
  let teacherAccount = {
    email: 'teacher@test.edu',
    passwordHash: '3iojfsoinfw',
    firstName: 'Teacher',
    lastName: 'Person',
    isTeacher: true
  }
  let result = await accountModel.createAccount(teacherAccount);
  console.log(result);
  let userAccount = {
    email: 'user@test.com',
    passwordHash: '3iojfsoinfw',
    firstName: 'Ryan',
    lastName: 'Nelson',
    isTeacher: false
  }
  result = await accountModel.createAccount(userAccount);
  console.log(result);
});

// GET ACCOUNTS INFO
(async () => {
  let teacherAccountId = 1;
  let userAccountId = 2;
  let result = await accountModel.getPublicAccountInfoById(teacherAccountId);
  console.log(result);
  result = await accountModel.getPublicAccountInfoById(userAccountId);
  console.log(result);
});

// LANGUAGES //

// INSERT LANGUAGE
(async () => {
  let result = await languageModel.insertLanguage('spanish');
  console.log(result);
});

// GET ALL LANGUAGES
(async () => {
  let result = await languageModel.getAllLanguages();
  console.log(result);
  console.log(result.rows.slice(0, 10));
});

// INSERT TAUGHT, KNOWN, DESIRED LANGUAGES
// Should throw an error if language or taughtLevel is invalid
(async () => {
  let teacherId = 1;
  let userId = 2;
  let taughtLevel = '5';
  let language = 'english';
  let result = await languageModel.insertTaughtLanguage(teacherId, taughtLevel, language);
  console.log(result);
  result = await languageModel.insertKnownLanguage(userId, language);
  console.log(result);
  result = await languageModel.insertDesiredLanguage(userId, language);
  console.log(result);
});

// GET TAUGHT, KNOWN, DESIRED LANGUAGES
(async () => {
  let teacherId = 1;
  let userId = 2;
  let result = await languageModel.getTaughtLanguagesByTeacherId(teacherId);
  console.log('taught', result.rows);
  result = await languageModel.getKnownLanguagesByUserId(userId);
  console.log('known', result.rows);
  result = await languageModel.getDesiredLanguagesByUserId(userId);
  console.log('desired', result.rows);
});

// accountChat tests
(async () => {
  let accountId = 1;
  let participantTwoId = 3;
  let message = 'hello there';
  let roomId = await chatModel.createRoom(accountId, participantTwoId);
  console.log(roomId);
  let result = await chatModel.postMessage(roomId, accountId, message);
  console.log(result);
  result = await chatModel.getRoomsByAccountId(accountId);
  console.log(result.rows);
  result = await chatModel.getMessagesByRoomId(roomId, accountId);
  console.log(result.rows);
});

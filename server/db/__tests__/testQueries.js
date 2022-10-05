const accountModel = require('../../models/accountModel.js');
const languageModel = require('../../models/languageModel.js');
const chatModel = require('../../models/chatModel.js');
const meetingsModel = require('../../models/meetingsModel.js');
const friendModel = require('../../models/friendModel.js');
const ratingsModel = require('../../models/ratingsModel.js');

// Will eventually replace this with jest testing in queries.test.js, but for now...

// ACCOUNTS //
// NOTE: Since we are creating a pw hash directly rather than going through auth
// we can't log in to these accounts using a service like postman to test the routes

// CREATE ACCOUNTS - STUDENT
(async () => {
  let studentOneAccount = {
    email: 'studentOne@test.com',
    passwordHash: '3iojfsoinfw',
    firstName: 'Ryan',
    lastName: 'Nelson',
    isTeacher: false
  }
  let result = await accountModel.createAccount(studentOneAccount);
  console.log(result);
  let studentTwoAccount = {
    email: 'studentTwo@test.com',
    passwordHash: '3iojfsoinfw',
    firstName: 'Bryan',
    lastName: 'Belson',
    isTeacher: false
  }
  result = await accountModel.createAccount(studentTwoAccount);
  console.log(result);
});

// CREATE ACCOUNTS - TEACHER
(async () => {
  let teacherOneAccount = {
    email: 'teacherOne@test.edu',
    passwordHash: '3iojfsoinfw',
    firstName: 'Teacher',
    lastName: 'Person',
    isTeacher: true
  }
  let result = await accountModel.createAccount(teacherOneAccount);
  console.log(result);
  teacherTwoAccount = {
    email: 'teacherTwo@test.edu',
    passwordHash: '3iojfsoinfw',
    firstName: 'Beacher',
    lastName: 'Berson',
    isTeacher: true
  }
  result = await accountModel.createAccount(teacherTwoAccount);
  console.log(result);
});

// CREATE ACCOUNTS - BOTH
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
  let studentAccount = {
    email: 'student@test.com',
    passwordHash: '3iojfsoinfw',
    firstName: 'Student',
    lastName: 'Person',
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

// CHAT //

// CREATE ROOM (requires users to be friends)
(async () => {
  let accountId = 1;
  let participantTwoId = 3;
  let result = await chatModel.createRoom(accountId, participantTwoId);
  console.log(result);
});

// POST MESSAGE
(async () => {
  let roomId = 1;
  let accountId = 1;
  let message = 'hello there';
  let result = await chatModel.postMessage(roomId, accountId, message);
  console.log(result);
});

// GET ROOMS
(async () => {
  let accountId = 3;
  let result = await chatModel.getRoomsByAccountId(accountId);
  console.log(result);
});

// GET MESSAGES BY ROOM
(async () => {
  let accountId = 1;
  let roomId = 1;
  let result = await chatModel.getMessagesByRoomId(roomId, accountId);
  console.log(result.rows);
});

// CONNECTIONS / FRIENDS //

// SEND FRIEND REQUEST
(async () => {
  let accountId1 = 3;
  let accountId2 = 1;
  let result = await friendModel.requestFriend(accountId1, accountId2);
  console.log(result);
});

// ACCEPT FRIEND REQUEST
(async () => {
  let accountId1 = 1;
  let accountId2 = 3;
  let result = await friendModel.acceptFriend(accountId1, accountId2);
  console.log(result);
  result = await friendModel.createFriend(accountId1, accountId2);
  console.log(result);
});

// REMOVE FRIEND
(async () => {
  let accountId1 = 1;
  let accountId2 = 3;
  let result = await friendModel.deleteFriend(accountId1, accountId2);
  console.log(result);
});

// GET FRIENDS
(async () => {
  let accountId = 1;
  let result = await friendModel.findFriends(accountId);
  console.log(result.rows);
});

// CHECK IF FRIENDS
(async () => {
  let accountId1 = 1;
  let accountId2 = 3;
  let result = await friendModel.checkIfFriends(accountId1, accountId2);
  console.log(result.rows[0].exists);
});

//GET MEETINGS
// (async () => {
//   let accountId1 = 1;
//   let accountId2 = 2;

//   let result = await meetingsModel.createAccount(accountId1,accountId2);
//   console.log(result);

//   result = await accountModel.createAccount(userAccount);
//   console.log(result);
// });

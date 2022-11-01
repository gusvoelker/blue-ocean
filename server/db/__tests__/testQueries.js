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
    email: '3@test.com',
    passwordHash: '3iojfsoinfwe',
    firstName: 'John',
    lastName: 'Smith',
    isTeacher: false
  }
  result = await accountModel.createAccount(studentTwoAccount);
  let three = {
    email: '4@test.com',
    passwordHash: '3iojfsoinfwr',
    firstName: 'Victoria',
    lastName: 'Renolds',
    isTeacher: false
  }
  result = await accountModel.createAccount(three);
  let four = {
    email: '4@test.com',
    passwordHash: '3iojfsoinfw4',
    firstName: 'Mathew',
    lastName: 'Douglas',
    isTeacher: false
  }
  result = await accountModel.createAccount(four);
  let five = {
    email: 'studentTwo@test.com5',
    passwordHash: '3iojfsoinfw5',
    firstName: 'Tabatha',
    lastName: 'Hood',
    isTeacher: false
  }
  result = await accountModel.createAccount(five);
  console.log(result);
});

// CREATE ACCOUNTS - TEACHER
(async () => {
  let teacherOneAccount = {
    email: 'teacherOne@test.edu',
    passwordHash: '3iojfsoinfw',
    firstName: 'Aaron',
    lastName: 'Voelker',
    isTeacher: true
  }
  let result = await accountModel.createAccount(teacherOneAccount);
  console.log(result);
  let teacherTwoAccount = {
    email: 'teacherTwo@test.edu',
    passwordHash: '3iojfsoinfwe',
    firstName: 'John',
    lastName: 'Edwards',
    isTeacher: true
  }
  result = await accountModel.createAccount(teacherTwoAccount);
 let  three = {
    email: '3@test.edu',
    passwordHash: '3iojfsoinfwe3',
    firstName: 'Olivia',
    lastName: 'Moody',
    isTeacher: true
  }
  result = await accountModel.createAccount(three);
  let four = {
    email: 'four@test.edu',
    passwordHash: '3iojfsoinfwe4',
    firstName: 'John',
    lastName: 'Edwards',
    isTeacher: true
  }
  result = await accountModel.createAccount(four);
  let five = {
    email: '5@test.edu',
    passwordHash: '3iojfsoinfwe5',
    firstName: 'Mike',
    lastName: 'Tyson',
    isTeacher: true
  }
  result = await accountModel.createAccount(five);
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
  let result = await languageModel.insertLanguage('English');
  let result1 = await languageModel.insertLanguage('Spanish');
  let result2 = await languageModel.insertLanguage('French');
  let result3 = await languageModel.insertLanguage('German');
  let result4 = await languageModel.insertLanguage('Italian');
  let result5 = await languageModel.insertLanguage('Romanian');
  let result6 = await languageModel.insertLanguage('Portuguese');
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
  let languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Romanian', 'Portuguese']
  for (let i = 1; i < 6; i++) {
    let teacherId = i + 5;
    let userId = i;
    let taughtLevel = '5';
    let language = i;
    let result = await languageModel.insertTaughtLanguageById(teacherId, language, taughtLevel);
    console.log(result);
    result = await languageModel.insertKnownLanguageById(userId, language);
    console.log(result);
    result = await languageModel.insertDesiredLanguageById(userId, language);
    console.log(result);
  }
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

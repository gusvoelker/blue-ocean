const query = require('../db.js').poolQuery;

// Will eventually replace this with jest testing in queries.test.js, but for now...
(async () => {
  let result = await query(`${'TEST QUERY'}`);
  console.log(result);
})();

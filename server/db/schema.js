const query = require('./db.js').poolQuery;

// NOTE: Tables which have foreign keys must be created after the table they reference
const tables = [
  {
    // Table example #1
    name: 'topics',
    fields: [
      ['id SERIAL PRIMARY KEY'],
      ['subject TEXT'],
    ],
    indexes: []
  },
  {
    // Table example #2
    name: 'tweets',
    fields: [
      ['user_id SERIAL PRIMARY KEY'],
      ['topic_id INTEGER'],
      ['tweet VARCHAR(280)'],
      ['date BIGINT'],
      ['likes INTEGER DEFAULT 0'],
      ['CONSTRAINT fk_topic_id FOREIGN KEY(topic_id) REFERENCES topics(id)']
    ],
    indexes: ['topic_id']
  }
];

// tables - list of tables to create
// table - Object with keys:
// table.name - Name of table
// table.fields - Fields / constraints with properties
// table.indexes - Indexes to create on provided fields
module.exports.setupTables = async () => {
  for (table of tables) {
    let fieldsParsed = '';
    for (let i = 0; i < table.fields.length; i++) {
      fieldsParsed += table.fields[i];
      if (i < table.fields.length - 1) {
        fieldsParsed += ', ';
      }
    }
    console.log(`CREATE TABLE IF NOT EXISTS ${table.name} (${fieldsParsed});`);
    await query(`
      CREATE TABLE IF NOT EXISTS ${table.name} (${fieldsParsed})
    `);
    for (let index of table.indexes) {
      await query(`
        CREATE INDEX ${table.name}_${index}_idx ON ${table.name} (${index})
      `);
    }
  }
};

// Drops all tables with public schema, re-creates public schema
// NOTE: Relies on table to not be using a different schema (public is default)
module.exports.dropTables = () => {
  return query('DROP SCHEMA public CASCADE')
    .then(() => query('CREATE SCHEMA public'));
};

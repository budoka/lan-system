console.log('pool.js is loading...');

const mysql = require('mysql2');

const Pool = args => {
  return mysql
    .createPool({
      connectionLimit: args.connectionLimit || 100,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: args.database
    })
    .promise();
};

module.exports = Pool;

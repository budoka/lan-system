console.log('database.js is loading...');

const Pool = require('./pool');
const exceptions = require('../exceptions');

const poolAdmin = Pool({ database: process.env.DATABASE_DB_ADMIN });
const poolEngine = Pool({ database: process.env.DATABASE_DB_ENGINE });

const isValidEmail = async email => {
  let stm = 'SELECT COUNT(*) AS isValidEmail FROM users_google WHERE email = ?';

  try {
    const result = (await poolAdmin.execute(stm, [email]))[0][0].isValidEmail === 1 ? true : false;

    if (result) {
      stm = 'UPDATE users_google SET last_login = now() WHERE email = ?';
      await poolAdmin.execute(stm, [email]);
    }

    return result;
  } catch (e) {
    exceptions.handleError('Error at email validation', e);
  }

  return false;
};

const getProjects = async (req, res) => {
  const columns = req.body.columns;
  const filter = req.body.filter.name;
  const order = req.body.order;
  const sort = req.body.sort;
  const limit = req.body.limit;
  const stm = `SELECT ${columns} FROM projects WHERE name LIKE ? ORDER BY ${order} ${sort} LIMIT ${limit}`;

  try {
    var result = (await poolEngine.execute(stm, [`%${filter}%`]))[0];
    
    res.send(result);
  } catch (e) {
    res.sendStatus(500);
    exceptions.handleError('Error trying to get projects', e);
  }
};

module.exports = {
  isValidEmail,
  getProjects
};


import promisePool from '../utils/database.js';

// TODO: lisää mallit ja muokkaa kontrollerit reiteille:
// GET /api/users - list all users
// GET /api/users/:id - get one user by id


// POST /api/users - add new user
const addUser = async (entry) => {
  const {username, password, email} = entry;
  const sql = `INSERT INTO USERS (username, password, email)
               VALUES (?, ?, ?)`;
  const params = [username, password, email];
  try {
    const rows = await promisePool.execute(sql, params);
    console.log('rows', rows);
    return {user_id: rows[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

// Huom: virheenkäsittely puuttuu
const findUserByUsername = async (username) => {
 const sql = 'SELECT * FROM Users WHERE username = ?';
 const [rows] = await promisePool.execute(sql, [username]);
 return rows[0];
};

const findAllUsers = async () => {
    const sql = 'SELECT id, username, email FROM Users';
    const [rows] = await promisePool.execute(sql);
    return rows;
};

const findUserById = async (id) => {
    const sql = 'SELECT id, username, email FROM Users WHERE id = ?';
    const [rows] = await promisePool.execute(sql, [id]);
    return rows[0];
};

export { findUserByUsername, findAllUsers, findUserById, addUser
};

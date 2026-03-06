import bcrypt from "bcryptjs";
import { findUserByUsername, findAllUsers, findUserById, addUser} from "../models/user-models.js";
import jwt from 'jsonwebtoken';
 

const getUsers = async (request, response) => {
  try {
    const users = await findAllUsers();
    // Älä ikinä lähetä salasanoja HTTP vastauksessa!
    users.forEach(u => delete u.password);
    return response.json(users);
  } catch (err) {
    console.error('getUsers error:', err);
    return response.status(500).json({ error: 'error' });
  }
};



// TODO: getUserById
const getUserById = async (request, response) => {
  try {
    const { id } = request.params;

    const user = await findUserById(id);
    if (!user) {
      return response.status(404).json({ error: 'user not found' });
    }

    delete user.password;
    return response.json(user);

  } catch (err) {
    console.error('getUserById error:', err);
    return response.status(500).json({ error: 'internal server error' });
  }
};

// TODO: putUserByID
const putUserById = async (request, response) => {
  try {
    const { id } = request.params;
    const { username, email } = request.body;

    // Tarkistaa löytyykö käyttäjä
    const user = await findUserById(id);
    if (!user) {
      return response.status(404).json({ error: 'user not found' });
    }

    // Päivittää käyttäjän
    const sql = `
      UPDATE Users
      SET username = ?, email = ?
      WHERE id = ?
    `;
    await promisePool.execute(sql, [username, email, id]);

    // Hakee ja palauttaa päivitetyn käyttäjän
    const updatedUser = await findUserById(id);
    delete updatedUser.password;

    return response.json(updatedUser);

  } catch (err) {
    console.error('putUserById error:', err);
    return response.status(500).json({ error: 'internal server error' });
  }
};

/* TODO: deleteUserById
const deleteUserById = async (request, response) => {
  try {
    const { id } = request.params;

    const user = await findUserById(id);
    if (!user) {
      return response.status(404).json({ error: 'user not found' });
    }

    const sql = 'DELETE FROM Users WHERE id = ?';
    await promisePool.execute(sql, [id]);

    return response.status(204).send();

  } catch (err) {
    console.error('deleteUserById error:', err);
    return response.status(500).json({ error: 'internal server error' });
  }
};*/


// Käyttäjän lisäys (rekisteröityminen)
const postUser = async (request, response) => {
  const newUser = request.body;
  console.log('Moi');
  // HUOM: ÄLÄ ikinä loggaa käyttäjätietoja ensimmäisten pakollisten testien jälkeen!!! (tietosuoja)
  //console.log('registering new user', newUser);

  // Lasketaan salasanasta tiiviste (hash)
  const hash = await bcrypt.hash(newUser.password, 10);
  //console.log('salasanatiiviste:', hash);
  // Korvataan selväkielinen salasana tiivisteellä ennen kantaan tallennusta
  newUser.password = hash;
  const newUserId = await addUser(newUser);
  return response.status(201).json({message: 'new user added', user_id: newUserId});
};

// Tietokantaversio valmis
const postLogin = async (req, res) => {
  const {username, password} = req.body;
  // haetaan käyttäjä-objekti käyttäjän nimen perusteella
  const user = await findUserByUsername(username);
  //console.log('postLogin user from db', user);
  if (user) {
    // jos asiakkaalta tullut salasana vastaa tietokannasta haettua tiivistettä, ehto on tosi
    if (await bcrypt.compare(password, user.password)) {
      delete user.password;
      // generate & sign token using a secret and expiration time
      // read from .env file
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      return res.json({message: 'login ok', user, token});
    }
    return res.status(403).json({error: 'invalid password'});
  }
  res.status(404).json({error: 'user not found'});
};

// Get user information based on token
const getMe = (req, res) => {

    res.json(req.user);
}

export {getUsers, getUserById, putUserById, postUser, getMe, postLogin};

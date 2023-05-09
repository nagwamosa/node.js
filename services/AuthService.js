// AuthService.js

const connection = require('../database/dbConnection');
const User = require('../models/login');

class AuthService {
  async login(email, password) {
    try {
      const query = `SELECT * FROM user WHERE email = "${email}" AND password = "${password}"`;
      const [rows] = await connection.query(query);
      if (rows.length === 0) return null;
      const { id, name, email, password } = rows[0];
      return new User(id, name, email, password);
    } catch (error) {
      console.error(error);
      throw new Error('Database error');
    }
  }
}

module.exports = AuthService;

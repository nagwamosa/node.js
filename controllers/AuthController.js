// AuthController.js

const express = require('express');
const { body, validationResult } = require('express-validator');
const AuthService = require('../services/AuthService');

const router = express.Router();

router.post('/login', [
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const authService = new AuthService();
    const user = await authService.login(email, password);

    if (!user) {
      return res.status(404).json({ errors: [{ msg: 'Invalid email or password' }] });
    }

    // Set the user session here, if applicable
    req.session.user = user;

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

module.exports = router;

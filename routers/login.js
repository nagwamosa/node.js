const express = require('express');
const bodyParser = require('body-parser');
const { check} = require('express-validator');

const UserController = require('../controllers/AuthController');
const UserService = require('../services/AuthService');

const userService = new UserService();
const userController = new UserController(userService);

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.post('/login', [
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
], userController.login.bind(userController));

module.exports = router;

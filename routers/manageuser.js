const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { v4 } = require('uuid');
const TravelerService = require('../services/user-service');
const TravelersController =require('../controllers/user-controller');
const connection = require('../database/dbConnection');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


// Dependencies Injection
const travelerService = new TravelerService(connection);
const travelersController = new TravelersController(travelerService);


// Routes
router.get('/', travelersController.fetchAll.bind(travelersController));
router.post('/', travelersController.create.bind(travelersController));
router.get('/:id', travelersController.fetchOne.bind(travelersController));
router.put('/:id', travelersController.update.bind(travelersController));
router.delete('/:id', travelersController.delete.bind(travelersController));

module.exports = router;


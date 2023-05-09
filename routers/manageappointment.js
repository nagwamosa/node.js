const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { v4 } = require('uuid');
const connection = require('../database/dbConnection')
const Appointment = require('../models/appointment');
const AppointmentService = require('../services/appointment-service');
const AppointmentsController = require('../controllers/appointment-controller');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());




 // Dependencies Injection
  const appointmentService = new AppointmentService(connection);
  const appointmentsController = new AppointmentsController(appointmentService);

    
    // Routes
    router.get('/', appointmentsController.fetchAll.bind(appointmentsController));
    router.post('/', appointmentsController.create.bind(appointmentsController));
    router.get('/:busno', appointmentsController.fetchOne.bind(appointmentsController));
    router.put('/:busno', appointmentsController.update.bind(appointmentsController));
    router.delete('/:busno', appointmentsController.delete.bind(appointmentsController));
    
    module.exports = router;


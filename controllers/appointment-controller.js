const Appointment = require('../models/appointment');
class AppointmentsController {
    constructor(appointmentService) {
      this.appointmentService = appointmentService;
    }
  
    async fetchAll(req, res) {
      try {
        const appointments = await this.appointmentService.getAll();
        res.json(appointments);
      } catch (error) {
        res.status(500).json({ message: error });
      }
    }
  
    async create(req, res) {
      const data = req.body;
  
      const newAppointment = new Appointment(
        data.busno,
        data.fromLocation,
        data.toLocation,
        data.ticketprice,
        data.day,
        data.time,
        data.maxnumberoftravelers
      );
  
      try {
        const busno = await this.appointmentService.create(newAppointment);
        res.status(201).json({ message: 'Appointment created successfully', busno });
      } catch (error) {
        res.status(500).json({ message: error });
      }
    }
  
    async fetchOne(req, res) {
      const busno = req.params.busno;
  
      try {
        const appointment = await this.appointmentService.getById(busno);
        res.json(appointment);
      } catch (error) {
        res.status(404).json({ message: error });
      }
    }
  
    async update(req, res) {
      const busno = req.params.busno;
      const data = req.body;
  
      try {
        await this.appointmentService.update(busno, {
          fromLocation: data.fromLocation,
          toLocation: data.toLocation,
          ticketprice: data.ticketprice,
          day: data.day,
          time: data.time,
          maxnumberoftravelers: data.maxnumberoftravelers
        });
  
        res.json({ message: 'Appointment updated successfully' });
      } catch (error) {
      if (error === 'Appointment not found') {
      res.status(404).json({ message: error });
      } else {
      res.status(500).json({ message: error });
      }
      }
      }
      
      async delete(req, res) {
      const busno = req.params.busno;
      
      try {
        await this.appointmentService.delete(busno);
        res.json({ message: 'Appointment deleted successfully' });
      } catch (error) {
        if (error === 'Appointment not found') {
          res.status(404).json({ message: error });
        } else {
          res.status(500).json({ message: error });
        }
      }
      }
      }

      module.exports = AppointmentsController;
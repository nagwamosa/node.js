const Booking = require('../models/booking');

class BookingController {
    constructor(bookingService) {
      this.bookingService = bookingService;
    }
  
    async createBooking(req, res) {
      try {
        
        const data = req.body;
        const newBooking = new Booking(data.userid, data.busno);
        const appointment = await this.bookingService.createBooking(newBooking);
        res.status(200).json({
          message: `Bus ${newBooking.busno} has been booked successfully`,
          appointment
        });
      } catch (error) {
        console.error(error);
        res.status(500).send('Failed to book the bus');
      }
    }
  }
  
  module.exports = BookingController;
class Appointment {
    constructor(busno, fromLocation, toLocation, ticketprice, day, time, maxnumberoftravelers) {
      this.busno = busno;
      this.fromLocation = fromLocation;
      this.toLocation = toLocation;
      this.ticketprice = ticketprice;
      this.day = day;
      this.time = time;
      this.maxnumberoftravelers = maxnumberoftravelers;
    }
  }
  module.exports = Appointment;
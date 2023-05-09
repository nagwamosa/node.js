
class BookingService {
  constructor(connection) {
    this.connection = connection;
  }

  async createBooking(booking) {
    const { userid, busno } = booking;

    try {
      await this.connection.query('INSERT INTO manytomany (userid, busno, request_status) VALUES (?, ?, ?)', [userid, busno, "waiting"]);
      // const queryResult = this.connection.query(`SELECT * FROM appointment WHERE busno = ${busno}`);
      //   const appointment = queryResult[0];
      //   console.log(appointment);
      //   const remainingCapacity = appointment.maxnumberoftravelers - 1;
         this.connection.query(`UPDATE appointment SET maxnumberoftravelers = maxnumberoftravelers - 1 WHERE busno =${busno} ? AND maxnumberoftravelers > 0` );
      

      return true;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to book the bus');
    }
  }
}

module.exports = BookingService;


// class BookingService {
//     constructor(database) {
//       this.database = database;
//     }
  
//     async createBooking(booking) {
//       return new Promise((resolve, reject) => {
//         this.database.query(
//           'INSERT INTO manytomany (userid, busno, request_status) VALUES (?, ?, ?)',
//           [booking.userid, booking.busno, 'waiting'],
//           (error, results) => {
//             if (error) {
//               console.error(error);
//               reject('Failed to book appointment');
//             } else {
//               resolve();
//             }
//           }
//         );
//       });
//     }
  
//     async decrementMaxTravelers(busno) {
//       return new Promise((resolve, reject) => {
//         this.database.query(
//           'UPDATE appointment SET maxnumberoftravelers=maxnumberoftravelers-1 WHERE busno=?',
//           [busno],
//           (error, results) => {
//             if (error) {
//               console.error(error);
//               reject('Failed to decrement maxnumberoftravelers');
//             } else {
//               resolve();
//             }
//           }
//         );
//       });
//     }
  
//     async getAppointment(busno) {
//       return new Promise((resolve, reject) => {
//         this.database.query(
//           'SELECT * FROM appointment WHERE busno = ?',
//           [busno],
//           (err, result) => {
//             if (result.length > 0) {
//               resolve(result[0]);
//             } else {
//               reject('Appointment not found');
//             }
//           }
//         );
//       });
//     }
//   }
  
//   module.exports = BookingService;
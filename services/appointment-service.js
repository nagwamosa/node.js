const appointment = require('../models/appointment');
class AppointmentService {
    constructor(connection) {
      this.connection = connection;
    }
  
    getAll() {
      return new Promise((resolve, reject) => {
        this.connection.query('SELECT * FROM appointment', (err, result) => {
          if (err) {
            console.log('Error fetching appointments: ', err);
            reject('An error occurred while fetching appointments');
          } else {
            resolve(result);
          }
        });
      });
    }
  
    create(appointment) {
        return new Promise((resolve, reject) => {
          this.connection.query(
            'INSERT INTO appointment SET ?',
            appointment,
            (err, result) => {
              if (err) {
                console.log('Error creating appointment:', err);
                reject('Error creating appointment');
              } else {
                console.log('Appointment created successfully!');
                resolve(result.insertId);
              }
            }
          );
        });
      }
  
    getById(busno) {
      return new Promise((resolve, reject) => {
        this.connection.query('SELECT * FROM appointment WHERE busno = ?', [busno], (err, result) => {
          if (result.length > 0) {
            resolve(result[0]);
          } else {
            reject('Appointment not found');
          }
        });
      });
    }
  
    update(busno, data) {
      return new Promise((resolve, reject) => {
        this.connection.query(
          'UPDATE appointment SET ? WHERE busno = ?',
          [{
            fromLocation: data.fromLocation,
            toLocation: data.toLocation,
            ticketprice: data.ticketprice,
            day: data.day,
            time: data.time,
            maxnumberoftravelers: data.maxnumberoftravelers,
          }, busno],
          (err, result) => {
            if (err) {
              console.log('Error updating appointment: ', err);
              reject('An error occurred while updating the appointment');
            } else if (result.changedRows === 0) {
              reject('Appointment not found');
            } else {
              resolve();
            }
          }
        );
      });
    }
  
    delete(busno) {
      return new Promise((resolve, reject) => {
        this.connection.query('DELETE FROM appointment WHERE busno = ?', [busno], (err, result) => {
          if (err) {
            console.log('Error deleting appointment: ', err);
            reject('An error occurred while deleting the appointment');
          } else if (result.affectedRows === 0) {
            reject('Appointment not found');
          } else {
            resolve();
          }
        });
      });
    }
  }
  module.exports = AppointmentService;
const Traveler = require('../models/user');


class TravelerService {
    constructor(connection) {
      this.connection = connection;
    }
  
    async createTraveler(traveler) {
      return new Promise((resolve, reject) => {
        this.connection.query(
          'INSERT INTO user SET ?',
          traveler,
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result.insertId);
            }
          }
        );
      });
    }
  
    async findByEmail(email) {
      return new Promise((resolve, reject) => {
        this.connection.query(
          'SELECT * FROM user WHERE email = ?',
          [email],
          (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results[0] || null);
            }
          }
        );
      });
    }
  
    async findById(id) {
      return new Promise((resolve, reject) => {
        this.connection.query(
          'SELECT * FROM user WHERE id = ?',
          [id],
          (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results[0] || null);
            }
          }
        );
      });
    }
  
    async findAll() {
      return new Promise((resolve, reject) => {
        this.connection.query('SELECT * FROM user', (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    }
  
    async updateTraveler(travelerId ,traveler) {
      return new Promise((resolve, reject) => {
        this.connection.query(
          'UPDATE user SET ? WHERE id = ?',
          [traveler, travelerId],
          (err, result) => {
            if (err) {
              reject(err);
            } else if (result.affectedRows === 0) {
              reject(new Error('No rows affected'));
            } else {
              resolve(traveler.id);
            }
          }
        );
      });
    }
  
    async deleteTraveler(id) {
      return new Promise((resolve, reject) => {
        this.connection.query(
          'DELETE FROM user WHERE id = ?',
          [id],
          (err, result) => {
            if (err) {
              reject(err);
            } else if (result.affectedRows === 0) {
              reject(new Error('No rows affected'));
            } else {
              resolve(id);
            }
          }
        );
      });
    }
  }

  module.exports = TravelerService;


// class TravelerService {
//     constructor(connection) {
//         this.connection = connection;
//       }

//   async getAll() {
//     try {
//       const travelers = await this.travelerRepository.getAll();
//       return travelers;
//     } catch (error) {
//       console.log('Error fetching travelers: ', error);
//       throw new Error("An error occurred while fetching travelers");
//     }
//   }

//   async create(data) {
//     const emailExists = await this.travelerRepository.checkEmailExistence(data.email);
//     if (emailExists) {
//       throw new Error('Email already taken');
//     } else {
//       const newTraveler = new Traveler(v4(), data.name, data.email, data.password, data.phone, data.type);
//       try {
//         await this.travelerRepository.create(newTraveler);
//         return { message: "Traveler created successfully", id: newTraveler.id };
//       } catch (error) {
//         console.log('Error creating traveler: ', error);
//         throw new Error("An error occurred while creating the traveler");
//       }
//     }
//   }

//   async getById(id) {
//     try {
//       const traveler = await this.travelerRepository.getById(id);
//       if (!traveler) {
//         throw new Error("Traveler not found");
//       } else {
//         return traveler;
//       }
//     } catch (error) {
//       console.log('Error fetching traveler: ', error);
//       throw new Error("An error occurred while fetching the traveler");
//     }
//   }

//   async updateById(id, data) {
//     try {
//       const traveler = await this.travelerRepository.getById(id);
//       if (!traveler) {
//         throw new Error("Traveler not found");
//       } else {
//         const updatedTraveler = new Traveler(id, data.name, data.email, data.password, data.phone, data.type);
//         await this.travelerRepository.updateById(id, updatedTraveler);
//         return { message: "Traveler updated successfully" };
//       }
//     } catch (error) {
//       console.log('Error updating traveler: ', error);
//       throw new Error("An error occurred while updating the traveler");
//     }
//   }

//   async deleteById(id) {
//     try {
//       const traveler = await this.travelerRepository.getById(id);
//       if (!traveler) {
//         throw new Error("Traveler not found");
//       } else {
//         await this.travelerRepository.deleteById(id);
//         return { message: "Traveler deleted successfully" };
//         }
//         } catch (error) {
//         console.log('Error deleting traveler: ', error);
//         throw new Error("An error occurred while deleting the traveler");
//         }
//         }
//         }
        
//         module.exports = TravelerService;
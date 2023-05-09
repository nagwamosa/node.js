const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../database/dbConnection');
const BookingService = require('../services/booking-service');
const BookingController = require('../controllers/booking-controller');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});
const bookingService = new BookingService(connection);
const bookingController = new BookingController(bookingService);

router.post('/bookings', async (req, res) => {bookingController.createBooking(req, res);});

module.exports = router;




// var express = require('express');
// const bodyParser = require('body-parser');
// const router = express.Router();
// const { body, validationResult } = require('express-validator');
// // parse application/x-www-form-urlencoded
// const connection = require('../database/dbConnection')
//   router.use(bodyParser.urlencoded({ extended: false }));

// // parse application/json
// router.use(bodyParser.json());
// router.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });




// router.post('/bookings', async (req, res) => {

//   try {
   
//     const data = req.body ;
//     console.log(store.storeBusno_UserId.userid);
//     connection.query('INSERT INTO manytomany ( userid, busno, request_status) VALUES ( ?, ?, ?)', [data.userid,data.busno,"waiting"], (error, results) => {
//       if (error) throw error;
//     })


//     res.status(200).json({
//       message: `Bus ${data.busno} has been booked successfully`
//        });
//       connection.query(`select * from appointment  WHERE busno =${data.busno} `, (err, result, fields) => {
//       selectResult=result[0];
     
//        remaining=selectResult.maxnumberoftravelers-1;
                
//                   connection.query(`UPDATE appointment SET maxnumberoftravelers=${remaining} where busno = ${data.busno}`, (err, results) => {
//                     if (err) throw err;
//                   })
//                 });     
      
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Failed to book the bus');
//   }
// });



//          module.exports = router;
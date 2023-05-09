const Traveler = require('../models/user');

class TravelersController {
    constructor(travelerService) {
      this.travelerService = travelerService;
    }
  
    async fetchAll(req, res) {
      try {
        const travelers = await this.travelerService.findAll();
        res.json(travelers);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  
    async create(req, res) {
      try {
        const { name, email, password, phone, type } = req.body;
  
        // Check if the email already exists in the database
        const existingTraveler = await this.travelerService.findByEmail(email);
  
        if (existingTraveler) {
          res.status(409).json({ message: 'Email already taken' });
        } else {
          const newTraveler = new Traveler(name, email, password, phone, type);
          const createdTravelerId = await this.travelerService.createTraveler(newTraveler);
  
          res.status(201).json({ id: createdTravelerId, message: "Traveler created successfully" });
        }
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  
    async fetchOne(req, res) {
      try {
        const travelerId = req.params.id;
        const traveler = await this.travelerService.findById(travelerId);
  
        if (!traveler) {
          res.status(404).json({ message: 'Traveler not found' });
        } else {
          res.json(traveler);
        }
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  
    async update(req, res) {
      try {
        const travelerId = req.params.id;
        const { name, email, password, phone, type } = req.body;
  
        const existingTraveler = await this.travelerService.findById(travelerId);
  
        if (!existingTraveler) {
          res.status(404).json({ message: 'Traveler not found' });
        } else {
          const updatedTraveler = new Traveler(name, email, password, phone, type);
          await this.travelerService.updateTraveler(travelerId, updatedTraveler);
  
          res.json({ message: "Traveler updated successfully" });
        }
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  
    async delete(req, res) {
      try {
        const travelerId = req.params.id;
        const existingTraveler = await this.travelerService.findById(travelerId);
  
        if (!existingTraveler) {
          res.status(404).json({ message: 'Traveler not found' });
        } else {
          await this.travelerService.deleteTraveler(travelerId);
  
          res.json({ message: "Traveler deleted successfully" });
        }
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  }

  module.exports = TravelersController;

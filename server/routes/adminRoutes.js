const express = require('express');
const {
    getPackages,
    addPackage,
    updatePackage,
    deletePackage,
    viewBookings,
} = require('../controllers/adminController');

const router = express.Router();

// Route to get all packages (Admin view)
router.get('/packages', getPackages);

// Route to add a new package
router.post('/packages', addPackage);

// Route to update a package
router.put('/packages/:id', updatePackage);

// Route to delete a package
router.delete('/packages/:id', deletePackage);

// Route to view all bookings
router.get('/bookings', viewBookings);

module.exports = router;

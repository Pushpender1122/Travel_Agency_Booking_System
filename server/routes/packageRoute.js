const express = require('express');
const {
    getAllPackages,
    getPackageById,
    bookPackage,
} = require('../controllers/packageController');

const router = express.Router();

// Get all packages
router.get('/packages', getAllPackages);

// Get details of a specific package
router.get('/packages/:id', getPackageById);

// Book a package
router.post('/bookings', bookPackage);

module.exports = router;

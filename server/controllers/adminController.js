const Package = require('../models/Package');
const Booking = require('../models/Booking');

// Get all packages
const getPackages = async (req, res) => {
    try {
        const packages = await Package.find();
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch packages' });
    }
};

// Add a new package
const addPackage = async (req, res) => {
    const { title, description, price, availableDates, image } = req.body;
    try {
        const newPackage = new Package({
            title,
            description,
            price,
            availableDates,
            image,
        });
        await newPackage.save();
        res.status(201).json({ message: 'Package added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add package' });
    }
};

// Update a package
const updatePackage = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, availableDates, image } = req.body;
    try {
        const updatedPackage = await Package.findByIdAndUpdate(
            id,
            { title, description, price, availableDates, image },
            { new: true }
        );
        if (!updatedPackage) {
            return res.status(404).json({ error: 'Package not found' });
        }
        res.status(200).json({ message: 'Package updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update package' });
    }
};

// Delete a package
const deletePackage = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPackage = await Package.findByIdAndDelete(id);
        if (!deletedPackage) {
            return res.status(404).json({ error: 'Package not found' });
        }
        res.status(200).json({ message: 'Package deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete package' });
    }
};

// View all bookings
const viewBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
};

module.exports = {
    getPackages,
    addPackage,
    updatePackage,
    deletePackage,
    viewBookings,
};

const Package = require('../models/Package');
const Booking = require('../models/Booking');

// Get all packages (user view)
const getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find();
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch packages' });
    }
};

// Get details of a specific package
const getPackageById = async (req, res) => {
    const { id } = req.params;
    try {
        const packageDetails = await Package.findById(id);
        if (!packageDetails) {
            return res.status(404).json({ error: 'Package not found' });
        }
        res.status(200).json(packageDetails);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch package details' });
    }
};

// Book a package
const bookPackage = async (req, res) => {
    const { packageId, name, email, phone, numberOfTravelers, specialRequests, date } = req.body;

    try {
        // Fetch the package details
        const packageDetails = await Package.findById(packageId);
        if (!packageDetails) {
            return res.status(404).json({ error: 'Package not found' });
        }

        // Calculate total price
        const totalPrice = packageDetails.price * numberOfTravelers;

        // Create a new booking
        const newBooking = new Booking({
            packageId,
            name,
            email,
            phone,
            numberOfTravelers,
            specialRequests,
            totalPrice,
            date,
        });

        await newBooking.save();

        // Generate a basic invoice (HTML response for now)
        const invoice = `
      <h1>Invoice</h1>
      <p><strong>Customer Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Package:</strong> ${packageDetails.title}</p>
      <p><strong>Number of Travelers:</strong> ${numberOfTravelers}</p>
        <p><strong>Date:</strong> ${date}</p>
      <p><strong>Total Price:</strong> $${totalPrice}</p>
      <p><strong>Special Requests:</strong> ${specialRequests || 'None'}</p>
    `;

        res.status(201).json({ message: 'Booking successful', invoice });
    } catch (error) {
        res.status(500).json({ error: 'Failed to book package' });
    }
};

module.exports = {
    getAllPackages,
    getPackageById,
    bookPackage,
};


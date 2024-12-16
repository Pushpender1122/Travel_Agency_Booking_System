const Package = require('../models/Package');
const Booking = require('../models/Booking');
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
// Get all packages (user view)
const getAllPackages = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default values: page 1, limit 10

    try {
        // Calculate the number of documents to skip
        const skip = (page - 1) * limit;

        // Fetch packages with pagination
        const packages = await Package.find()
            .skip(skip) // Skip the documents for previous pages
            .limit(parseInt(limit)); // Limit the number of documents fetched

        // Get the total count of documents
        const totalPackages = await Package.countDocuments();

        res.status(200).json({
            data: packages,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalPackages / limit),
            totalPackages,
        });
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
    const { packageId, name, email, phone, numberOfTravelers, specialRequests, selectedDate } = req.body;
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
            date: selectedDate,
        });

        await newBooking.save();
        // Generate PDF invoice
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);

        // Add content to the PDF
        page.drawText('Invoice', { x: 50, y: 350, size: 20, color: rgb(0, 0.53, 0.8) });
        page.drawText(`Customer Name: ${name}`, { x: 50, y: 300, size: 12 });
        page.drawText(`Email: ${email}`, { x: 50, y: 280, size: 12 });
        page.drawText(`Phone: ${phone}`, { x: 50, y: 260, size: 12 });
        page.drawText(`Package: ${packageDetails.title}`, { x: 50, y: 240, size: 12 });
        page.drawText(`Number of Travelers: ${numberOfTravelers}`, { x: 50, y: 220, size: 12 });
        page.drawText(`Date: ${selectedDate}`, { x: 50, y: 200, size: 12 });
        page.drawText(`Special Requests: ${specialRequests || 'None'}`, { x: 50, y: 180, size: 12 });
        page.drawText(`Total Price: $${totalPrice}`, { x: 50, y: 160, size: 12 });

        // Save PDF as bytes
        const pdfBytes = await pdfDoc.save();

        // Set response headers to trigger download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="invoice-${newBooking._id}.pdf"`);

        // Send the PDF file to the client
        res.status(200).send(Buffer.from(pdfBytes));
    } catch (error) {
        console.error('Error during booking:', error);
        res.status(500).json({ error: 'Failed to book package' });
    }
};

module.exports = {
    getAllPackages,
    getPackageById,
    bookPackage,
};


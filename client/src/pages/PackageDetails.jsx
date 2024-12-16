import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const PackageDetails = () => {
    const { id } = useParams();
    const [packageDetails, setPackageDetails] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        numberOfTravelers: 0,
        specialRequests: '',
        selectedDate: '',
    });

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_SERVER_URL}/packages/${id}`)
            .then((response) => setPackageDetails(response.data))
            .catch((error) => console.error('Error fetching package details:', error));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const totalPrice = formData.numberOfTravelers * packageDetails.price;
        const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/bookings`,
            {
                ...formData,
                packageId: id,
                totalPrice,
            },
            {
                responseType: 'blob', // Specify that the response is a blob
            }
        );

        const url = window.URL.createObjectURL(new Blob([response.data])); // Create a URL for the blob
        const a = document.createElement('a');
        a.href = url;
        a.download = 'invoice.pdf'; // Set the file name
        document.body.appendChild(a);
        a.click();
        a.remove(); // Clean up
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow">
            {packageDetails.title ? (
                <>
                    <h1 className="text-4xl font-bold mb-4 text-blue-600">{packageDetails.title}</h1>
                    <img
                        src={packageDetails.image}
                        alt={packageDetails.title}
                        className="h-96 w-full object-cover rounded-lg mb-6"
                    />
                    <div className="text-gray-700 space-y-4">
                        <p className="text-lg">{packageDetails.description}</p>
                        <p className="text-xl font-semibold">Price per traveler: ${packageDetails.price}</p>
                        <p className="text-md">Available Dates: {packageDetails.availableDates?.join(', ') || 'Not specified'}</p>
                    </div>

                    <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">Book This Package</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="p-3 border rounded shadow-sm focus:ring-2 focus:ring-blue-300"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="p-3 border rounded shadow-sm focus:ring-2 focus:ring-blue-300"
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="p-3 border rounded shadow-sm focus:ring-2 focus:ring-blue-300"
                        />
                        <input
                            type="number"
                            placeholder="Number of Travelers"
                            required
                            min="1"
                            value={formData.numberOfTravelers > 0 ? formData.numberOfTravelers : ''}
                            onChange={(e) => setFormData({ ...formData, numberOfTravelers: e.target.value })}
                            className="p-3 border rounded shadow-sm focus:ring-2 focus:ring-blue-300"
                        />
                        <select
                            required
                            value={formData.selectedDate}
                            onChange={(e) => setFormData({ ...formData, selectedDate: e.target.value })}
                            className="p-3 border rounded shadow-sm focus:ring-2 focus:ring-blue-300"
                        >
                            <option value="" disabled>
                                Select a Date
                            </option>
                            {packageDetails.availableDates?.map((date, index) => (
                                <option key={index} value={date}>
                                    {date}
                                </option>
                            ))}
                        </select>
                        <textarea
                            placeholder="Special Requests"
                            value={formData.specialRequests}
                            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                            className="p-3 border rounded shadow-sm focus:ring-2 focus:ring-blue-300 col-span-2"
                        ></textarea>

                        <button
                            type="submit"
                            className="col-span-2 bg-blue-600 text-white font-bold py-3 rounded shadow hover:bg-blue-700 transition"
                        >
                            Book Now
                        </button>
                    </form>
                </>
            ) : (
                <p className="text-center text-gray-500">Loading package details...</p>
            )}
        </div>
    );
};

export default PackageDetails;

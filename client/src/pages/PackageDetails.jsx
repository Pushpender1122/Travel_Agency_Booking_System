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
        travelers: 1,
        requests: '',
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/api/packages/${id}`).then((response) => {
            setPackageDetails(response.data);
        });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/api/bookings', { ...formData, packageId: id })
            .then((response) => alert('Booking successful!'))
            .catch((error) => alert('Error booking package.'));
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{packageDetails.title}</h1>
            <img src={packageDetails.image} alt={packageDetails.title} className="h-80 w-full object-cover rounded mb-4" />
            <p>{packageDetails.description}</p>
            <p className="font-bold">Price: ${packageDetails.price}</p>
            <form onSubmit={handleSubmit} className="mt-4">
                <input
                    type="text"
                    placeholder="Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {/* Additional fields */}
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Book Now</button>
            </form>
        </div>
    );
};

export default PackageDetails;

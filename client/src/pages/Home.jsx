import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/packages').then((response) => {
            setPackages(response.data);
        });
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Available Tour Packages</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                    <div key={pkg._id} className="border rounded shadow p-4">
                        <img src={pkg.image} alt={pkg.title} className="h-40 w-full object-cover rounded mb-2" />
                        <h2 className="text-xl font-bold">{pkg.title}</h2>
                        <p>{pkg.description}</p>
                        <p className="font-bold">Price: ${pkg.price}</p>
                        <Link to={`/packages/${pkg._id}`} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;

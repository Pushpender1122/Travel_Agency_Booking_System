import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [packages, setPackages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch packages with pagination
        axios
            .get(`${import.meta.env.VITE_SERVER_URL}/packages`, {
                params: { page: currentPage, limit: 10 }, // Pass page and limit
            })
            .then((response) => {
                setPackages(response.data.data);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching packages:', error);
                setLoading(false);
            });
    }, [currentPage]); // Trigger when currentPage changes

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
                Discover Your Next Adventure
            </h1>
            <p className="text-lg text-center text-gray-600 mb-8">
                Explore our curated tour packages and embark on unforgettable journeys.
            </p>

            {loading ? (
                <div className="text-center text-gray-600">Loading...</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {packages.map((pkg) => (
                            <div
                                key={pkg._id}
                                className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
                            >
                                <img
                                    src={pkg.image}
                                    alt={pkg.title}
                                    className="h-56 w-full object-cover rounded-t-lg"
                                />
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                        {pkg.title}
                                    </h2>
                                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                                    <p className="text-lg font-bold text-gray-800">
                                        Price: <span className="text-blue-500">${pkg.price}</span>
                                    </p>
                                    <Link
                                        to={`/packages/${pkg._id}`}
                                        className="block mt-4 text-center bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="mt-8 flex justify-center space-x-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            Prev
                        </button>
                        <span className="self-center text-lg">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;

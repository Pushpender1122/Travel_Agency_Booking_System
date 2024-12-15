import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AdminPage = () => {
    const navigate = useNavigate();
    const [packages, setPackages] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        availableDates: [],
        image: "",
    });
    const [editId, setEditId] = useState(null);
    const [newDate, setNewDate] = useState("");
    // Check if the user is logged in as an admin 
    //This is not the acctual way to check if the user is logged in as an admin use the backend of it but for now i use this 
    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin/login");
        }
    }, []);
    // Fetch all packages
    useEffect(() => {
        fetchPackages();
    }, []);
    // Set the Authorization header for all axios requests
    axios.interceptors.request.use((config) => {
        const token = localStorage.getItem("adminToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
    const fetchPackages = async () => {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/packages`);
        setPackages(response.data);
    };

    // Add or Update a Package
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editId) {
            // Update Package
            await axios.put(`${import.meta.env.VITE_SERVER_URL}/admin/packages/${editId}`, formData);
            setEditId(null);
        } else {
            // Add New Package
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/admin/packages`, formData);
        }

        setFormData({ title: "", description: "", price: "", availableDates: [], image: "" });
        setNewDate("");
        fetchPackages();
    };

    // Add a Date to Available Dates
    const addDate = () => {
        if (newDate.trim() !== "") {
            setFormData((prev) => ({
                ...prev,
                availableDates: [...prev.availableDates, newDate],
            }));
            setNewDate("");
        }
    };

    // Remove a Date from Available Dates
    const removeDate = (date) => {
        setFormData((prev) => ({
            ...prev,
            availableDates: prev.availableDates.filter((d) => d !== date),
        }));
    };

    // Edit a Package
    const handleEdit = (pkg) => {
        setEditId(pkg._id);
        setFormData({
            title: pkg.title,
            description: pkg.description,
            price: pkg.price,
            availableDates: pkg.availableDates,
            image: pkg.image,
        });
    };

    // Delete a Package
    const handleDelete = async (id) => {
        await axios.delete(`${import.meta.env.VITE_SERVER_URL}/admin/packages/${id}`);
        fetchPackages();
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Admin Dashboard</h1>

            {/* Add / Edit Package Form */}
            <div className="bg-white p-6 rounded shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-4">{editId ? "Edit Package" : "Add Package"}</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="title" className="block font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter package title"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="block font-medium text-gray-700 mb-1">Price</label>
                        <input
                            type="number"
                            id="price"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter price"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className="block font-medium text-gray-700 mb-1">Image URL</label>
                        <input
                            type="text"
                            id="image"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter image URL"
                            required
                        />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <label htmlFor="description" className="block font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter description"
                            required
                        />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <label htmlFor="dates" className="block font-medium text-gray-700 mb-1">Available Dates</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                id="dates"
                                value={newDate}
                                onChange={(e) => setNewDate(e.target.value)}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter a date (e.g., 2024-12-25)"
                            />
                            <button
                                type="button"
                                onClick={addDate}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex gap-2 mt-2 flex-wrap">
                            {formData.availableDates.map((date, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded flex items-center gap-2"
                                >
                                    {date}
                                    <button
                                        type="button"
                                        onClick={() => removeDate(date)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        &times;
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        >
                            {editId ? "Update Package" : "Add Package"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Display Existing Packages */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Existing Packages</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {packages.map((pkg) => (
                        <div key={pkg._id} className="bg-white rounded shadow-md p-4">
                            <img
                                src={pkg.image}
                                alt={pkg.title}
                                className="h-40 w-full object-cover rounded mb-2"
                            />
                            <h3 className="text-xl font-bold">{pkg.title}</h3>
                            <p className="text-gray-600">{pkg.description}</p>
                            <p className="text-blue-600 font-bold mt-2">Price: ${pkg.price}</p>
                            <p className="text-gray-700 mt-2">
                                <span className="font-bold">Available Dates: </span>
                                {pkg.availableDates.join(", ")}
                            </p>
                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => handleEdit(pkg)}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(pkg._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;

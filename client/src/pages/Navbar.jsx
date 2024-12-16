import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-blue-500 text-white shadow-lg">
            <div className="container mx-auto px-4 flex justify-between items-center h-16">
                {/* Logo / Home Icon */}
                <div className="flex items-center">
                    <Link to="/" className="flex items-center space-x-2 text-lg font-bold">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 9.75l7.5-7.5 7.5 7.5M4.5 10.5v9.75h15V10.5m-6 5.25h-3"
                            />
                        </svg>
                        <span>Home</span>
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-6">
                    <Link
                        to="/admin"
                        className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200 transition"
                    >
                        Admin Page
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-blue-600">
                    <ul className="flex flex-col space-y-2 p-4">
                        <li>
                            <Link to="/" className="block py-2 px-4 hover:bg-blue-700 rounded">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin"
                                className="block py-2 px-4 bg-white text-blue-500 rounded hover:bg-gray-200"
                            >
                                Admin Page
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

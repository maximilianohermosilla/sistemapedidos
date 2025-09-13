import "./Header.css";
import React, { useState } from "react";
import logo from '../assets/logo/logo_black_bottom.jpeg';
import { FaCartShopping } from "react-icons/fa6";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <a href="#" className="flex-shrink-0 hover:cursor-pointer hover:opacity-75 active:ring-2 active:ring-blue-400">
                        <img src={logo} alt="Logo Header" width={100} height={50} />
                    </a>

                    {/* Search bar (visible en desktop) */}
                    <div className="hidden md:flex flex-1 mx-6">
                        <div className="search-input-container relative w-full">
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                className="search-input-field w-full rounded-full pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-700"
                            />
                            <FaSearch className="search-icon" />
                        </div>
                    </div>

                    {/* Links desktop */}
                    <div className="hidden md:flex space-x-6">
                        <a href="#" className="header__link text-gray-600 hover:text-blue-400">
                            <FaMapMarkerAlt />
                        </a>
                        <a href="#" className="header__link text-gray-600 hover:text-blue-400">
                            <FaCartShopping />
                        </a>
                    </div>

                    {/* Hamburguesa mobile */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="header__link hover:cursor-pointer">
                            <FiMenu></FiMenu>
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú desplegable en mobile */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <div className="px-4 pt-2 pb-3 space-y-2">
                        {/* Search en mobile */}
                        <div className="search-input-container relative w-full">
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                className="search-input-field w-full rounded-full pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <FaSearch className="search-icon" />
                        </div>

                        {/* Links */}
                        <a href="#" className="flex text-gray-700 hover:text-gray-500 hover:bg-gray-100 w-full gap-3 justify-start items-center py-2 pl-1 rounded-md">
                            <FaMapMarkerAlt /> Ubicación
                        </a>
                        <a href="#" className="flex text-gray-700 hover:text-gray-500 hover:bg-gray-100 w-full gap-3 justify-start items-center py-2 pl-1 rounded-md">
                            <FaCartShopping /> Carrito
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
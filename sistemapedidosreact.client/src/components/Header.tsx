import "./Header.css";
import React, { useContext, useEffect, useState } from "react";
import logo from '../assets/logo/logo_black_bottom.jpeg';
import { FaSearch } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { BsPersonVcard } from "react-icons/bs";
import CustomTooltip from "./Tooltip";
import { BiFoodMenu } from "react-icons/bi";
import { LuMapPin } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { PiCheese } from "react-icons/pi";

const Header: React.FC = () => {
    const [cartItems, setCartItems] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [inputSearch, setInputSearch] = useState('');
    const cartContext = useContext<any>(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        setCartItems(cartContext.cartItems);
    }, [cartContext.cartItems]);

    const handleSearch = () => {
        if (inputSearch) {
            setMenuOpen(false);
            navigate(`/search/${inputSearch}`);
        }
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <header className="bg-white shadow-md fixed w-full top-0 left-0 z-1200">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <a href="/" className="flex-shrink-0 hover:cursor-pointer hover:opacity-75 active:ring-2 active:ring-blue-400">
                        <img src={logo} alt="Logo Header" width={100} height={50} />
                    </a>

                    {/* Search bar (visible en desktop) */}
                    <div className="hidden md:flex flex-1 mx-6">
                        <div className="search-input-container relative w-full">
                            <input
                                type="text"
                                value={inputSearch}
                                onChange={(e) => setInputSearch(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Buscar productos..."
                                className="search-input-field w-full rounded-full pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-700"
                            />
                            <FaSearch className="search-icon cursor-pointer hover:opacity-50" onClick={handleSearch} />
                        </div>
                    </div>

                    {/* Links desktop */}
                    <div className="hidden md:flex space-x-6">
                        <CustomTooltip content="Contacto">
                            <a href="/contact" className="header__link text-gray-600 hover:text-blue-400">
                                <LuMapPin />
                            </a>
                        </CustomTooltip>

                        <CustomTooltip content="Picadas">
                            <a href="/picadas" className="header__link text-gray-600 hover:text-blue-400">
                                <PiCheese />
                            </a>
                        </CustomTooltip>

                        <CustomTooltip content="Pedidos">
                            <a href="/orders" className="header__link text-gray-600 hover:text-blue-400">
                                <BsPersonVcard />
                            </a>
                        </CustomTooltip>

                        <CustomTooltip content="Carrito">
                            <a href="/shopping-cart" className="header__link relative text-gray-600 hover:text-blue-400">
                                <IoCartOutline />
                                {cartItems.length > 0 && <span className="absolute bg-red-500 text-white text-xs font-medium px-2.5 rounded-full -my-1.5 mx-1.5 leading-6">{cartItems.length}</span>}
                            </a>
                        </CustomTooltip>
                    </div>

                    {/* Hamburguesa mobile */}
                    <div className="md:hidden flex items-center">
                        <a href="/picadas" className="header__link flex flex-col justify-center align-center text-gray-600 hover:text-blue-400 mr-5">
                            <PiCheese className="mx-auto mt-3 mb-0" /> <span className="leading-3 text-xs">Picadas</span>
                        </a>
                        {cartItems.length > 0 && <a href="/shopping-cart" className="header__link relative text-gray-600 hover:text-blue-400 mr-5">
                            <IoCartOutline />
                            <span className="absolute bg-red-500 text-white text-xs font-medium px-2.5 rounded-full -my-1.5 mx-1.5 leading-6">{cartItems.length}</span>
                        </a>}
                        <button onClick={() => setMenuOpen(!menuOpen)} className="header__link hover:cursor-pointer">
                            <FiMenu></FiMenu>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Menú desplegable en mobile */}
            {menuOpen && (
                <nav className="md:hidden bg-white shadow-md">
                    <div className="px-4 pt-2 pb-3 space-y-2">
                        {/* Search en mobile */}
                        <div className="search-input-container relative w-full">
                            <input
                                type="text"
                                value={inputSearch}
                                onChange={(e) => setInputSearch(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Buscar productos..."
                                className="search-input-field w-full rounded-full pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-700"
                            />
                            <FaSearch className="search-icon cursor-pointer hover:opacity-50" onClick={handleSearch} />
                        </div>

                        {/* Links */}


                        <a href="/" className="flex text-gray-700 hover:text-gray-500 hover:bg-gray-100 w-full gap-3 justify-start items-center py-2 pl-1 rounded-md">
                            <BiFoodMenu /> Menú
                        </a>

                        <a href="/picadas" className="flex text-gray-700 hover:text-gray-500 hover:bg-gray-100 w-full gap-3 justify-start items-center py-2 pl-1 rounded-md">
                            <PiCheese /> Picadas
                        </a>

                        <a href="/contact" className="flex text-gray-700 hover:text-gray-500 hover:bg-gray-100 w-full gap-3 justify-start items-center py-2 pl-1 rounded-md">
                            <LuMapPin /> Ubicación
                        </a>


                        <a href="/orders" className="flex text-gray-700 hover:text-gray-500 hover:bg-gray-100 w-full gap-3 justify-start items-center py-2 pl-1 rounded-md">
                            <BsPersonVcard /> Pedidos
                        </a>
                        <a href="/shopping-cart" className="flex text-gray-700 hover:text-gray-500 hover:bg-gray-100 w-full gap-3 justify-start items-center py-2 pl-1 rounded-md">
                            <IoCartOutline /> Carrito
                            {cartItems.length > 0 && <span className="bg-red-500 text-white text-xs font-medium px-2.5 rounded-full -my-1.5 mx-1.5 leading-6">{cartItems.length}</span>}
                        </a>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs"; // Optional icons for toggle
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function NavBar() {
  const [click, setClick] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const handleClick = () => setClick(!click);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <>
      <div className="flex flex-row justify-end max-w-[1500px] mx-auto bg-black gap-7 px-5 py-4">
        <a href="http://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="w-10" />
        </a>
        <a
          href="http://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
      </div>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact="true" to="/" className="nav-logo">
            <span>
              <span className="text-[#ffdd40]">ay|</span>
              <span>
                cre<span className="text-[#ffdd40]">a</span>tive
              </span>
            </span>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact="true"
                to="/"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact="true"
                to="/services"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                Services
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact="true"
                to="/login"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact="true"
                to="/signup"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                Signup
              </NavLink>
            </li>
          </ul>

          {/* Hamburger Menu */}
          <div className="nav-icon" onClick={handleClick}>
            {click ? (
              <span className="icon">
                <IoMdClose />
              </span>
            ) : (
              <span className="icon">
                <RxHamburgerMenu />
              </span>
            )}
          </div>
          {/* Search Input */}
          <div className=" mr-3 ml-3">
            <input
              type="text"
              placeholder="🔎 Search..."
              className="search-box px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300 dark:bg-gray-100 dark:text-white dark:border-gray-600"
            />
          </div>
          {/* Dark Mode Toggle */}
          <div
            className="dark-toggle mt-[7px]"
            onClick={toggleDarkMode}
            title="Toggle Dark Mode"
          >
            {darkMode ? (
              <BsSunFill size={20} />
            ) : (
              <BsMoonStarsFill color="white" size={20} />
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;

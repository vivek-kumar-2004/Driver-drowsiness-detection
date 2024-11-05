import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { BsFillHouseFill, BsFillBookFill, BsFillChatDotsFill } from 'react-icons/bs';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsOpen(false);
  };

  return (
    <div>
      {/* Upper Navbar */}
      <nav className="bg-[#4F0341] shadow-lg p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src="https://ideogram.ai/assets/image/lossless/response/JDC37BrSQRKL6eyWk2LCiQ"
              alt="Logo"
              className="h-10 w-10 rounded-full shadow-lg"
            />
            <h1 className="text-2xl font-bold text-white">Driver Drowsiness Detection</h1>
          </div>

          {/* Links for larger screens */}
          <ul className="hidden md:flex space-x-8">
            {['Dashboard', 'Reports', 'Help'].map((link) => (
              <li key={link}>
                <Link
                  to={`/${link.toLowerCase()}`}
                  onClick={() => handleLinkClick(link)}
                  className={`text-white font-semibold hover:text-yellow-400 transition duration-300 relative ${activeLink === link ? 'font-bold underline' : ''}`}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? (
                <XMarkIcon className="h-6 w-6 text-white" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center space-y-4 mt-4 bg-[#4F0341] rounded-lg p-4">
          {['Dashboard', 'Reports', 'Help'].map((link) => (
            <li key={link}>
              <Link
                to={`/${link.toLowerCase()}`}
                onClick={() => handleLinkClick(link)}
                className={`text-white font-semibold hover:text-yellow-400 transition duration-300 relative ${activeLink === link ? 'font-bold underline' : ''}`}
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Bottom Navbar for Mobile Only */}
      <div className="nav__menu fixed bottom-0 w-[85%] left-[7.5%] bg-[#4F0341] bg-opacity-80 rounded-3xl p-2 backdrop-blur-md md:hidden mb-[3%] z-50">
        <ul className="nav__list flex justify-around items-center">
          <li className="nav__item">
            <Link to="/dashboard" className={`nav__link flex flex-col items-center`}>
              <BsFillHouseFill className="text-white text-2xl" />
              <span className="text-white text-xs">Dashboard</span>
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/reports" className={`nav__link flex flex-col items-center`}>
              <BsFillBookFill className="text-white text-2xl" />
              <span className="text-white text-xs">Reports</span>
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/help" className={`nav__link flex flex-col items-center`}>
              <BsFillChatDotsFill className="text-white text-2xl" />
              <span className="text-white text-xs">Help</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

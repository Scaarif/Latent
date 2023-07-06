import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { logo } from '../assets';
import Button from './Button';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="w-full flex flex-row justify-between items-center bg-white py-2 px-4 fixed z-10">
      <Link to="/">
        <img src={logo} alt="logo" className="h-12" />
      </Link>
      <div className="hidden md:flex space-x-4 items-center">
        <span className="p-1 cursor-pointer capitalize hover:border-b border-green"><a href="#hero">home</a></span>
        <span className="p-1 cursor-pointer capitalize hover:border-b border-green"><a href="#services">services</a></span>
        <span className="p-1 cursor-pointer capitalize hover:border-b border-green"><a href="#contacts">contact us</a></span>
        <span className="p-1 cursor-pointer capitalize hover:border-b border-green"><a href="#explore">explore</a></span>
      </div>
      <div className="hidden md:flex items-center space-x-2">
        <Link to="/login">
          <Button name="Login" type="secondary" />
        </Link>
        <Link to="/signup">
          <Button name="Sign Up" />
        </Link>
      </div>
      <div className="flex md:hidden items-center">
        {
          menuOpen ? (
            <AiOutlineClose
              style={{ color: hovered ? 'black' : 'green', height: '20px', width: '20px' }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <AiOutlineMenu
              style={{ color: hovered ? 'black' : 'green', height: '20px', width: '20px' }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={() => setMenuOpen(true)}
            />
          )
        }
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-16 shadow-sm smooth-transition ${menuOpen ? 'left-0' : '-left-full'}`}>
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;

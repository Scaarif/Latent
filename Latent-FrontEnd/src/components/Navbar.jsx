import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { logo } from '../assets';
import Button from './Button';
import MobileMenu from './MobileMenu';

const ProfileModal = ({ showProfile }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleEdit = (e) => {
    console.log('editing profile to: ', e.target.value);
  };

  return (
    <div className={`absolute smooth-transition ${showProfile ? 'right-4' : '-right-full'} top-16 flex flex-col gap-2 bg-white p-4 py-6 rounded-md shadow-lg`}>
      <span className="text-center rounded-sm transition-colors hover:text-md_green cursor-pointer bg-light_green py-2">
        Become an agent
      </span>
      <div className="grid grid-cols-3 gap-1 ">
        <span className="col-span-1">Name</span>
        {edit ? (
          <input
            type="text"
            value="john doe"
            onChange={handleEdit}
            className="col-span-2 text-s_gray border border-light_green focus:outline-none pl-2 rounded-sm"
          />
        ) : (
          <span className="col-span-2 text-s_gray">Jane Doe</span>)}
      </div>
      <div className="grid grid-cols-3 gap-1 ">
        <span className="col-span-1">Email</span>
        {edit ? (
          <input
            type="text"
            value="johndoe@gmail.com"
            onChange={handleEdit}
            className="col-span-2 text-s_gray border border-light_green focus:outline-none pl-2 rounded-sm"
          />
        ) : (
          <span className="col-span-2 text-s_gray">johndoe@gmail.com</span>)}
      </div>
      <div className="flex items-center justify-between">
        <span
          className="rounded-sm text-sm text-green bg-light_green p-1 px-2 cursor-pointer transition-colors
      hover:text-md_green"
          onClick={() => setEdit(!edit)}
        >{edit ? 'Save' : 'Edit'}
        </span>
        <span
          className="rounded-sm text-sm text-green bg-light_green p-1 px-2 cursor-pointer transition-colors
      hover:text-md_green"
          onClick={() => setShowConfirmation(true)}
        >Delete
        </span>
      </div>
      <div className={`flex flex-col py-2 smooth-transition ${showConfirmation ? 'h-full opacity-1' : 'h-0 opacity-0'}`}>
        <span>Are you sure you want to delete?</span>
        <div className="flex items-center justify-between">
          <span
            className="rounded-sm text-sm text-green bg-light_green p-1 px-2 cursor-pointer transition-colors
      hover:text-md_green"
            onClick={() => setShowConfirmation(false)}
          >Cancel
          </span>
          <span
            className="rounded-sm text-sm text-green bg-light_green p-1 px-2 cursor-pointer transition-colors
      hover:text-md_green"
            onClick={() => setShowConfirmation(false)}
          >Delete
          </span>
        </div>
      </div>
    </div>
  );
};

const LoggedInNavbarLinks = () => {
  const [showProfile, setShowProfile] = useState(false);
  return (
    <>
      <div className="hidden md:flex space-x-4 items-center">
        <Link to="/user" className="p-1 cursor-pointer capitalize hover:border-b border-green">My Listings</Link>
        <Link to="/explore" className="p-1 cursor-pointer capitalize hover:border-b border-green">Explore</Link>
        <Link to="/user/cart" className="p-1 cursor-pointer capitalize hover:border-b border-green">Cart</Link>
      </div>
      <div
        className="hidden group md:flex items-center space-x-2 mr-2 cursor-pointer"
        onClick={() => setShowProfile(!showProfile)}
      >
        <span className="text-sm text-green bg-bg_color rounded-full p-2 group-hover:text-md_green">JD</span>
        <span className="text-green group-hover:text-md_green">John Doe</span>
      </div>
      <ProfileModal
        showProfile={showProfile}
      />

    </>
  );
};

const NavbarLinks = () => (
  <>
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
  </>

);

const Navbar = () => {
  const currentRoute = useLocation();
  // console.log(currentRoute.pathname);
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // const [isAgent, setIsAgent] = useState(false);

  const isLanding = currentRoute.pathname === '/';

  return (
    <div className="max-w-[1400px] w-full flex flex-row justify-between items-center bg-white py-2 px-4 fixed z-10">
      <Link to="/">
        <img src={logo} alt="logo" className="h-12" />
      </Link>
      { isLanding ? (<NavbarLinks />) : (<LoggedInNavbarLinks />)}
      {/* Humbugger */}

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
        <MobileMenu isLanding={isLanding} />
      </div>
    </div>
  );
};

export default Navbar;

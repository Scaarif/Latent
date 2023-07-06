import React, { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { logo } from '../assets';
import Button from './Button';

const Navbar = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="w-full flex flex-row justify-between items-center bg-white py-2 px-4 fixed z-10">
      <img src={logo} alt="logo" className="h-12"/>
      <div className="hidden md:flex space-x-4 items-center">
        <span className="p-1 cursor-pointer capitalize hover:border-b border-green">home</span>
        <span className="p-1 cursor-pointer capitalize hover:border-b border-green">services</span>
        <span className="p-1 cursor-pointer capitalize hover:border-b border-green">contact us</span>
        <span className="p-1 cursor-pointer capitalize hover:border-b border-green">explore</span>
      </div>
      <div className="hidden md:flex items-center space-x-2">
        <Button name="Login" type="secondary" />
        <Button name="Sign Up" />
      </div>
      <div className="flex md:hidden items-center">
        <AiOutlineMenu
          style={{ color: hovered ? 'black' : 'green', height: '20px', width: '20px' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
      </div>
    </div>
  )
}

export default Navbar;

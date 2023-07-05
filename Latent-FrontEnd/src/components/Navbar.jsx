import React from 'react';
import { logo } from '../assets';
import Button from './Button';

const Navbar = () => {
  return (
    <div className="w-full flex flex-row justify-between items-center bg-white py-2 px-4 fixed z-10">
      <img src={logo} alt="logo" className="h-12"/>
      <div className="flex space-x-4 items-center">
        <span className="p-1 cursor-pointer capitalize hover:border-b border-green">home</span>
        <span className="p-1 cursor-pointer capitalize hover:border-b border-green">services</span>
        <span className="p-1 cursor-pointer capitalize hover:border-b border-green">contact us</span>
        <span className="p-1 cursor-pointer capitalize hover:border-b border-green">explore</span>
      </div>
      <div className="flex items-center space-x-2">
        <Button name="Login" type="secondary" />
        <Button name="Sign Up" />
      </div>
    </div>
  )
}

export default Navbar;

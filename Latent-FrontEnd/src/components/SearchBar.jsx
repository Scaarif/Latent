import React from 'react';
import Button from './Button';

const SearchBar = () => (
  <div className="flex flex-col md:flex-row bg-white p-4 border border-light_green">
    <div className="flex flex-col space-y-2 mb-2 md:mb-0 md:flex-row md:mr-2">
      <input type="text" placeholder="Agent full name" className="border pl-2 text-sm text-green focus:outline-none" />
      <input type="text" placeholder="Number of rooms" className="border pl-2 text-sm text-green focus:outline-none" />
      <input type="text" placeholder="Location" className="border pl-2 text-sm text-green focus:outline-none" />
      <input type="text" placeholder="Price range" className="border pl-2 text-sm text-green focus:outline-none" />
    </div>
    <Button name="Search" />
  </div>
);

export default SearchBar;

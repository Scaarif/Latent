import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import { Autocomplete } from '@react-google-maps/api';

import Button from './Button';

const SearchBar = ({ name, isLoaded }) => {
  console.log({ isLoaded });

  const locationRef = useRef();

  return (
    <div className="flex flex-col md:flex-row bg-white p-4 border border-light_green">
      <div className="flex flex-col space-y-2 md:space-y-0 mb-2 md:mb-0 md:flex-row md:mr-2">
        <input type="text" placeholder="Agent full name" className="border pl-2 text-sm text-green focus:outline-none" />
        <input type="text" placeholder="Number of rooms" className="border pl-2 text-sm text-green focus:outline-none" />
        <Autocomplete className="">
          <input
            type="text"
            placeholder="Location"
            ref={locationRef}
            className="border w-full h-full pl-2 text-sm text-green focus:outline-none"
          />
        </Autocomplete>
        <input type="text" placeholder="Price range" className="border pl-2 text-sm text-green focus:outline-none" />
      </div>
      <Link to="/explore">
        <Button name={(name && name) || 'Search'} />
      </Link>
    </div>
  );
};

export default SearchBar;

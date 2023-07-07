import React, { useState } from 'react';
import { BsFilter } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

export const MobileFilter = ({ setShowMobileFilter }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col w-full md:hidden bg-white border px-4 py-4">
      <div className="flex items-center justify-between">
        <span className="py-1 px-2">Filter by</span>
        <span className="py-1 px-2">
          <AiOutlineClose
            style={{ color: hovered ? 'black' : 'green', height: '20px', width: '20px' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => setShowMobileFilter(false)}
          />
        </span>
      </div>
      <div className="w-full flex flex-col space-y-2 md:space-y-0 md:space-x-2 mb-2 md:mb-0 md:flex-row md:mr-2 p-2 px-4">
        <input type="text" placeholder="Agent full name" className="border rounded-sm py-1.5 pl-2 text-sm text-green focus:outline-none" />
        <input type="text" placeholder="Number of rooms" className="border rounded-sm py-1.5 pl-2 text-sm text-green focus:outline-none" />
        <input type="text" placeholder="Location" className="border rounded-sm py-1.5 pl-2 text-sm text-green focus:outline-none" />
        <input type="text" placeholder="Price range" className="border rounded-sm py-1.5 pl-2 text-sm text-green focus:outline-none" />
        <span className="text-green border-light_green bg-light_green p-2 text-center cursor-pointer transition-colors hover:text-md_green">
          Filter listing
        </span>
      </div>
    </div>
  );
};

export const Filter = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="hidden w-full md:flex md:flex-row justify-between bg-white rounded-sm py-2 mr-2 md:mr-0">
      <div className="flex flex-col space-y-2 md:space-y-0 md:space-x-2 mb-2 md:mb-0 md:flex-row md:mr-2 p-2 px-4">
        <span className="hidden border-r border-slate-400 px-2 py-1">Showing all</span>
        <input type="text" placeholder="Agent full name" className="border rounded-md py-1.5 pl-2 text-sm text-green focus:outline-none" />
        <input type="text" placeholder="Number of rooms" className="border rounded-md py-1.5 pl-2 text-sm text-green focus:outline-none" />
        <input type="text" placeholder="Location" className="border rounded-md py-1.5 pl-2 text-sm text-green focus:outline-none" />
        <input type="text" placeholder="Price range" className="border rounded-md py-1.5 pl-2 text-sm text-green focus:outline-none" />
      </div>
      <div className="flex items-center justify-end pr-4">
        <span className="flex border p-1.5 px-4 rounded-md transition-colors hover:border-md_green">
          <BsFilter
            style={{ color: hovered ? 'green' : 'black', height: '20px', width: '20px' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          />
        </span>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
// import SearchBar from '../components/SearchBar';
import { houses } from '../constants';
import PaginatedListing from '../components/PaginatedListing';
import HouseCard from '../components/HouseCard';
import { Filter, MobileFilter } from '../components/Filter';

const MapFilter = () => (
  <div className="flex items-center justify-between">
    <div className="flex space-x-2 p-2 px-4">
      <input type="text" placeholder="Agent full name" className="border rounded-md text-center text-sm text-green focus:outline-none" />
      <input type="text" placeholder="Number of rooms" className="border rounded-md text-center text-sm text-green focus:outline-none" />
      <input type="text" placeholder="Location" className="border rounded-md text-center text-sm text-green focus:outline-none" />
      <input type="text" placeholder="Price range" className="border rounded-md text-center text-sm text-green focus:outline-none" />
    </div>
  </div>
);

const MapVersion = ({ setUseMap }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <div className="hidden w-full md:flex flex-col mt-8 mx-16">
      <h1 className="text-xl text-green font-bold mb-8">
        Explore houses, find one that fits your needs and budget
      </h1>
      <div className="flex gap-4 max-h-screen mb-16">
        <div className="flex flex-col gap-2 w-full h-full overflow-auto">
          {houses?.map((house, i) => (
            <HouseCard key={i} house={house} />
          ))}
        </div>
        <div className="flex w-full bg-hero-bg border-2 border-light_green rounded-md">
          <div className="w-full mt-2 capitalize">
            <div className="flex justify-end items-center gap-2 px-4 mb-4">
              <span
                onClick={() => setShowFilter(true)}
                className="bg-white px-4 py-1 rounded-sm text-green transition-colors hover:text-md_green cursor-pointer shadow-sm"
              >
                + Add filters
              </span>
              <span
                onClick={() => setUseMap(false)}
                className="bg-white px-4 py-1 rounded-sm text-green transition-colors hover:text-md_green cursor-pointer shadow-sm"
              >
                Close map
              </span>
            </div>
            <div className={`${showFilter ? 'opacity-100' : 'opacity-0'} smooth-transition flex justify-center md:min-w-[790px] w-full`}>
              <div className="flex items-center bg-white p-2 shadow-sm ">
                <MapFilter />
                <span className="">
                  <AiOutlineClose
                    style={{ color: hovered ? 'black' : 'green', height: '20px', width: '20px' }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onClick={() => setShowFilter(false)}
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="flex" />
        </div>
      </div>
    </div>
  );
};

const Explore = () => {
  // const [useMap, setUseMap] = useState(true);
  const [useMap, setUseMap] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  if (useMap) return <MapVersion setUseMap={setUseMap} />;
  return (
    <div className="w-full my-8 mx-2 md:mx-16">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-16 mb-8">
        <h1 className="text-xl text-green font-bold text-center md:text-start">
          Explore Houses, find one that fits your needs and budget
        </h1>
        <span
          className="hidden md:flex p-1 md:p-2 border-b border-md_green md:border-none hover:border-green md:px-4
              md:bg-white text-green rounded-sm cursor-pointer transition-colors hover:text-md_green"
          onClick={() => setUseMap(true)}
        >
          Go to map
        </span>
        <span
          className="md:hidden p-1 border-b border-md_green text-green rounded-sm cursor-pointer transition-colors hover:text-md_green"
          onClick={() => setShowMobileFilter(true)}
        >
          Filter listing
        </span>
      </div>
      <div className="flex items-center justify-center">
        <Filter />
        { showMobileFilter && <MobileFilter setShowMobileFilter={setShowMobileFilter} /> }
      </div>
      <div className="flex flex-col md:mt-8">
        <h2 className="text-green text-center md:text-start">Currently listed vacancies</h2>
        <PaginatedListing houses={houses} />
      </div>
    </div>
  );
};

export default Explore;

import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
// import SearchBar from '../components/SearchBar';
import { houses } from '../constants';
// import PaginatedListing from '../components/PaginatedListing';
import HouseCard from '../components/HouseCard';
// import { Filter, MobileFilter } from '../components/Filter';
import HousesListingTemplate from '../components/HousesListingTemplate';

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
  const toMap = true;

  if (useMap) return <MapVersion setUseMap={setUseMap} />;
  return (
    <HousesListingTemplate
      houses={houses}
      header=""
      useMap={useMap}
      setUseMap={setUseMap}
      leaveLink=""
      subHeader=""
      toMap={toMap}
    />
  );
};

export default Explore;

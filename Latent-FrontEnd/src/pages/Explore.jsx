import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { houses } from '../constants';
import PaginatedListing from '../components/PaginatedListing';

const MapVersion = () => (
  <div className="flex">
    Map Version
  </div>
);

const Explore = () => {
  // const [useMap, setUseMap] = useState(true);
  const [useMap, setUseMap] = useState(false);
  return (
    <>
      { useMap ? (<MapVersion />) : (
        <div className="w-full my-8 mx-16">
          <div className="flex justify-between items-center gap-16 mb-8">
            <h1 className="text-xl text-green font-bold">
              Explore Houses, find one that fits your needs and budget
            </h1>
            <span
              className="p-2 px-4 bg-white text-green rounded-sm cursor-pointer transition-colors hover:text-md_green"
              onClick={() => setUseMap(true)}
            >
              Go to map
            </span>
          </div>
          <div className="flex items-center justify-center">
            <SearchBar name="filter listing" />
          </div>
          <div className="flex flex-col mt-8">
            <h2 className="text-green">Some of the listed vacancies</h2>
            <PaginatedListing houses={houses} />
          </div>
        </div>
      )}
    </>
  );
};

export default Explore;

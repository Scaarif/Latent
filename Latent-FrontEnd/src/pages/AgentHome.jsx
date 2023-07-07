import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { houses } from '../constants';
import { Filter, MobileFilter } from '../components/Filter';
import PaginatedListing from '../components/PaginatedListing';

const AgentHome = () => {
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  return (
    <div className="w-full my-8 mx-2 md:mx-16">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-16 mb-8">
        <Link
          to="/explore"
          className="md:flex p-2 hover:border-green md:px-4
             bg-white text-green rounded-sm cursor-pointer transition-colors hover:text-md_green"
          onClick={() => {}}
        >
          Explore all Listings
        </Link>
        <Link
          to="/houses/new"
          className="md:flex p-2 hover:border-green md:px-4
             bg-white text-green rounded-sm cursor-pointer transition-colors hover:text-md_green"
          onClick={() => {}}
        >
          +Post a new House
        </Link>
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
        <h2 className="hidden md:block text-green text-center md:text-start">Currently listed vacancies</h2>
        <PaginatedListing houses={houses} />
      </div>
    </div>
  );
};

export default AgentHome;

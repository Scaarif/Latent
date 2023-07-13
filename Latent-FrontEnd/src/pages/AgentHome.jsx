import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { altHouses } from '../constants';
import { useSelector } from 'react-redux';
import { Filter, MobileFilter } from '../components/Filter';
import PaginatedListing from '../components/PaginatedListing';

import { useGetAllHousesQuery } from '../redux/services/latentAPI';

const AgentHome = () => {
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const { data: allHouses, isFetching, error } = useGetAllHousesQuery();
  const thisAgent = useSelector((state) => state.user.user);
  let agentHouses = [];
  // const [agentHouses, setAgentHouses] = useState([]);
  // console.log({ thisAgent });
  if (!isFetching && !error) {
    // filter out thisAgent's houses...
    agentHouses = allHouses.data?.filter((house) => thisAgent.listings.includes(house._id));
    // console.log({ houses });
    // setAgentHouses(houses);
  }
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
        <h2 className="hidden md:block text-green text-center md:text-start">My currently listed vacancies</h2>
        <PaginatedListing houses={agentHouses} loggedIn="true" />
      </div>
    </div>
  );
};

export default AgentHome;

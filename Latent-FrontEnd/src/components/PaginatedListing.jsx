import React, { useState } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import HouseCard from './HouseCard';

const Pagination = ({ totalHouses, housesPerPage, setCurrentPage, currentPage }) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalHouses / housesPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <div className="bg-gray-400 cursor-pointer items-center px-2 py-2 rounded-full">
        <span className="transition-colors text-white hover:text-black">
          <MdArrowForwardIos
            style={{ color: 'white', height: '16px', width: '16px', transform: 'rotate(180deg)' }}
          />
        </span>
      </div>
      {
        pages?.map((page) => (
          <div className="bg-gray-400 cursor-pointer items-center px-3 py-1 rounded-full" key={page}>
            <span
              onClick={() => setCurrentPage(page)}
              className={`transition-colors text-white hover:text-black ${currentPage === page && 'text-black'} `}
            >{page}
            </span>
          </div>
        ))
      }
      <div className="bg-gray-400 cursor-pointer items-center px-2 py-2 rounded-full">
        <span className="transition-colors text-white hover:text-black">
          <MdArrowForwardIos
            style={{ color: 'white', height: '16px', width: '16px' }}
          />
        </span>
      </div>
    </div>
  );
};

const PaginatedListing = ({ houses }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [housesPerPage, setHousesPerPage] = useState(6);
  const lastHouseIndex = currentPage * housesPerPage;
  const firstHouseIndex = lastHouseIndex - housesPerPage;
  const currentHouses = houses.slice(firstHouseIndex, lastHouseIndex);
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        {currentHouses?.map((house, i) => (
          <HouseCard key={i} house={house} />
        ))}
      </div>
      <Pagination
        totalHouses={houses.length}
        housesPerPage={housesPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default PaginatedListing;

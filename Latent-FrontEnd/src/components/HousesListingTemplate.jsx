import React from 'react';

const HousesListingTemplate = ({ header, leaveLink, houses }) => {
  return (
    <div className="w-full my-8 mx-2 md:mx-16">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-16 mb-8">
        <h1 className="text-xl text-green font-bold text-center md:text-start">
          { header || "Explore Houses, find one that fits your needs and budget" }
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
  )
}

export default HousesListingTemplate;

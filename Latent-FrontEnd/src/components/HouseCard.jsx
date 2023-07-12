import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdPinDrop, MdPayment, MdBathroom, MdBedroomParent, MdGroupAdd } from 'react-icons/md';

const HouseCard = ({ house, loggedIn }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-[320px] flex flex-col h-[400px] rounded-md bg-white relative transition-shadow hover:shadow-md cursor-pointer"
    >
      <img src={house.coverImage} alt="house" className="h-2/4 object-cover rounded-t-md" />
      <div className="absolute z-10 top-2 left-2 bg-white text-green text-sm flex items-center rounded-sm">
        <span
          onClick={() => navigate(`/houses/${house.id}`)}
          className="px-2 py-1 border-r transition-colors hover:text-md_green cursor-pointer"
        >
          See more
        </span>
      </div>
      {loggedIn && (
      <div className="absolute z-1 top-2 right-2 bg-white text-green text-sm flex items-center rounded-sm">
        <span className="px-2 py-1 border-r transition-colors hover:text-md_green cursor-pointer" onClick={() => navigate(`/edit/${house.id}`)}>Edit</span>
        <span className="px-2 py-1 border-l transition-colors hover:text-md_green cursor-pointer">Delete</span>
      </div>
      ) }
      <div className="flex flex-col p-4 gap-2 text-s_gray">
        <h1 className="font-semibold text-slate-500 py-2">{ house.name ? `${`${house.name} ${house.houseType}`}` : `${house.numRooms} Bedroom ${house.houseType}`}</h1>
        <p className="flex items-center space-x-2">
          <span><MdPayment style={{ height: '20px', width: '20px', color: '#75BD97' }} className="inline-block" /></span>
          <span className="text-md ">ksh {house.price}/mth</span>
        </p>
        <p className="flex items-center space-x-2">
          <span><MdPinDrop style={{ height: '20px', width: '20px', color: '#75BD97' }} className="inline-block" /></span>
          <span className="text-sm">{ `${`${house.address}, ${house.location.state}`}`}</span>
        </p>
        <div className="flex border-t mt-4 py-4">
          <p className="border-r flex-1 flex justify-start items-center gap-2 text-sm">
            <span><MdBedroomParent style={{ height: '20px', width: '20px', color: '#75BD97' }} className="inline-block" /></span>
            {house.numRooms} Bedrooms
          </p>
          <p className="border-l flex-1 flex justify-end items-center gap-2 text-sm">
            <span><MdBathroom style={{ height: '20px', width: '20px', color: '#75BD97' }} className="inline-block" /></span>
            {house.numBathrooms} Bathrooms
          </p>
        </div>
        {/* roommate flag */}
        {house.shared && (
        <div className="absolute top-[190px] -right-2 bg-green text-white text-sm px-4 pr-6 py-1 flex items-center space-x-2 rounded-md">
          <span><MdGroupAdd style={{ height: '20px', width: '20px', color: 'white' }} className="inline-block" /></span>
          <span>Roommates</span>
        </div>
        ) }
      </div>
    </div>
  );
};

export default HouseCard;

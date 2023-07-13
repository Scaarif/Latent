import React, { useState } from 'react';
import { BsFilter } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

export const MobileFilter = ({ setShowMobileFilter }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col w-full md:hidden bg-white shadow-sm px-4 py-4">
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

export const Filter = (props) => {
  const [hovered, setHovered] = useState(false);
  const [values, setValues] = useState({});
  const changeHandler = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };
  const { setSearchParams } = props;
  const applyFilter = () => {
    let params = {};
    if (values.agentName) {
      const [agentFirstname, agentLastname] = values.agentName;
      params = { agentFirstname, agentLastname };
    }
    for (const field of ['rooms', 'country', 'state', 'city', 'minPrice', 'maxPrice']) {
      if (values[field] && values[field] !== '') {
        params[field] = values[field];
      }
      if (['maxPrice', 'rooms'].includes(field)) {
        delete params[field];
      }
    }
    setSearchParams(params);
  }
  return (
    <div className="hidden w-full md:flex md:flex-row justify-between bg-white rounded-sm py-2 mr-2 md:mr-0">
      <div className="flex flex-col flex-wrap space-y-2 md:space-y-0 md:space-x-2 mb-2 md:mb-0 md:flex-row md:mr-2 p-2 px-4 justify-around">
        <span className="hidden border-r border-slate-400 px-2 py-1">Showing all</span>
        <input name="agentName" onChange={changeHandler} type="text" placeholder="Agent full name" className="border m-2 rounded-md p-1.5 text-sm text-green focus:outline-none" />
        <input name='rooms' onChange={changeHandler} type="number" placeholder="Number of rooms" className="border m-2 rounded-md p-1.5 text-sm text-green focus:outline-none" />
        <input name='country' onChange={changeHandler} type="text" placeholder="Country" className="border rounded-md m-2 p-1.5 text-sm text-green focus:outline-none" />
        <input name='state' onChange={changeHandler} type="text" placeholder="State" className="border rounded-md m-2 p-1.5 text-sm text-green focus:outline-none" />
        <input name='city' onChange={changeHandler} type="text" placeholder="City" className="border rounded-md m-2 p-1.5 text-sm text-green focus:outline-none" />
        <input name='minPrice' onChange={changeHandler} type="number" placeholder="Minimum price" className="border m-2 rounded-md p-1.5 text-sm text-green focus:outline-none" />
        <input name='maxPrice' onChange={changeHandler} type="number" placeholder="Maximum price" className="border m-2 rounded-md p-1.5 text-sm text-green focus:outline-none" />
      </div>
      <div className="flex items-center justify-end pr-4">
        <span className="flex border p-1.5 px-4 rounded-md transition-colors hover:border-md_green">
          <BsFilter
            style={{ color: hovered ? 'green' : 'black', height: '20px', width: '20px' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={applyFilter}
          />
        </span>
      </div>
    </div>
  );
};

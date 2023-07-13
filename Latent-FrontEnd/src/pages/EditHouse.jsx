import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormInput from '../components/FormInput';

import { altHouses } from '../constants';

const EditHouse = () => {
  const navigate = useNavigate();
  const { houseId } = useParams();
  const house = altHouses.find((hse) => hse.id === Number(houseId));
  // console.log({ house });
  const [values, setValues] = useState({
    // houseName: house.houseName,
    address: house.address,
    houseType: house.houseType,
    price: house.price,
    location: house.location,
    numBedrooms: house.numRooms,
    numBathrooms: house.numBathrooms,
    description: house.description,
    isShared: house.isShared ? 'yes' : 'no',
    // coverImage: house.coverImage,
    // houseImages: house.houseImages,
    houseName: house.name,
    // address: '',
    // houseType: '',
    // price: '',
    // location: '',
    // numBedrooms: '',
    // numBathrooms: '',
    // description: '',
    // isShared: '',
    coverImage: '',
    houseImages: '',
  });

  const inputs = [
    {
      id: 1,
      name: 'houseName',
      type: 'text',
      placeholder: 'House name',
      errorMessage:
        "House name should be 3-30 characters and shouldn't include any special character!",
      label: 'House Name',
      required: true,
    },
    {
      id: 2,
      name: 'address',
      type: 'text',
      placeholder: 'Address',
      errorMessage: 'Address should be a string of characters',
      label: 'Address',
      required: true,
    },
    {
      id: 3,
      name: 'houseType',
      type: 'text',
      placeholder: 'House type',
      label: 'House Type',
    },
    {
      id: 4,
      name: 'price',
      type: 'text',
      placeholder: 'Price range',
      errorMessage:
        'Price should be a range (two numbers) separated by a dash (-) eg 10000 - 15000',
      label: 'Price Range',
      required: true,
    },
    {
      id: 5,
      name: 'location',
      type: 'text',
      placeholder: 'City, state/county, country',
      errorMessage: 'Location must be 3 comma separated words',
      label: 'Location',
      required: true,
    },
    {
      id: 6,
      name: 'numBedrooms',
      type: 'number',
      placeholder: 'Bedrooms',
      errorMessage: 'Number of bedrooms must be a number, [0] for bedsitter',
      label: 'Number of bedrooms',
      required: true,
    },
    {
      id: 7,
      name: 'numBathrooms',
      type: 'number',
      placeholder: 'Bathrooms',
      errorMessage: 'Number of bathrooms must be a number',
      label: 'Number of bathrooms',
      required: true,
    },
    {
      id: 8,
      name: 'description',
      type: 'text',
      placeholder: 'House description',
      errorMessage:
        'Description should be a paragraph describing the house',
      label: 'House Description',
      // pattern: '^[A-Za-z0-9]{3,30}$',
      required: true,
    },
    {
      id: 9,
      name: 'isShared',
      type: 'text',
      placeholder: 'Looking for a roomate? Yes or No',
      errorMessage:
        'Enter Yes or No',
      label: 'Share with roommate(s)?',
      required: true,
    },
    {
      id: 10,
      name: 'coverImage',
      type: 'file',
      placeholder: 'House image',
      errorMessage:
        'Upload an image of the house',
      label: 'House Image',
      required: true,
    },
    {
      id: 11,
      name: 'houseImages',
      type: 'file',
      placeholder: 'more images',
      errorMessage:
        'Upload more images of the house',
      label: 'More House Images',
      required: false,
      multiple: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ values });
    // navigate back to user listings
    navigate('/user');
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex w-full items-center justify-center my-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col px-4 md:px-16 md:items-start md:py-4 md:bg-white rounded-md md:w-2/3"
      >
        <h1 className="flex md:pl-0 gap-1 items-center py-4 text-lg font-semibold text-green">
          Edit house details
        </h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <div className="flex flex-col md:flex-row items-center gap-4 md:justify-between w-full">
          <button
            type="button"
            onClick={() => navigate('/user')}
            className="w-[280px] md:w-full mt-8 bg-green rounded-md text-white p-3
            transition-colors hover:bg-md_green"
          >Cancel
          </button>
          <button
            type="submit"
            className="w-[280px] md:w-full mt-8 bg-green rounded-md text-white p-3
            transition-colors hover:bg-md_green"
          >Edit
          </button>
        </div>

      </form>
    </div>
  );
};

export default EditHouse;

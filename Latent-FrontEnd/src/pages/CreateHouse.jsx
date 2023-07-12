import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import FormInput from '../components/FormInput';
import { usePostHouseMutation } from '../redux/services/latentAPI';

const CreateHouse = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    address: '',
    houseType: '',
    price: '',
    location: '',
    numRooms: '',
    numBathrooms: '',
    numFloors: '',
    description: '',
    shared: '',
    coverImage: '',
    images: '',
  });

  const inputs = [
    {
      id: 1,
      name: 'name',
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
      name: 'numRooms',
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
      name: 'shared',
      type: 'text',
      placeholder: 'Looking for a roomate? Yes or No',
      errorMessage:
        'Enter Yes or No',
      label: 'Share with roommate(s)?',
      required: true,
    },
    {
      id: 10,
      name: 'numFloors',
      type: 'number',
      placeholder: 'Floor number',
      errorMessage: 'Floor number must be a number',
      label: 'Floor number',
      required: true,
    },
    {
      id: 11,
      name: 'coverImage',
      type: 'file',
      placeholder: 'House image',
      errorMessage:
        'Upload an image of the house',
      label: 'House Image',
      required: true,
    },
    {
      id: 12,
      name: 'images',
      type: 'file',
      placeholder: 'more images',
      errorMessage:
        'Upload more images of the house',
      label: 'More House Images',
      required: false,
      multiple: true,
    },
  ];

  const [postHouse, { isLoading }] = usePostHouseMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ values });
    const data = { ...values };
    delete data.location;
    const [city, state, country] = values.location.split(',');
    data.city = city;
    data.state = state;
    data.country = country;
    data.shared = data.shared === 'Yes';
    data.electricity = true;
    data.water = true;
    // data.country = country;
    console.log(data);
    if (!isLoading) {
      try {
        const formData = new FormData();
        Object.keys(data).forEach((key) => formData.append(key, data[key]));
        const res = await postHouse(formData).unwrap();
        console.log('post house res: ', res);
        if (res.success) {
          // navigate back to user listings
          navigate('/user');
        }
      } catch (error) {
        console.error('Failed to post house: ', error);
      }
    }
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
          Post a house
        </h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button
          type="submit"
          className="w-[280px] md:w-full mt-8 bg-green rounded-md text-white p-3
          transition-colors hover:bg-md_green"
        >Post House
        </button>
      </form>
    </div>
  );
};

export default CreateHouse;

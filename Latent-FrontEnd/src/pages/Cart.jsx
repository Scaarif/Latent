import React from 'react';
import { useSelector } from 'react-redux';
import HousesListingTemplate from '../components/HousesListingTemplate';
// import { altHouses } from '../constants';
import { useGetAllHousesQuery } from '../redux/services/latentAPI';

const Cart = () => {
  const { data, isFetching, error } = useGetAllHousesQuery();
  const user = useSelector((state) => state.user.user);
  let houses = [];

  if (!isFetching && !error) {
    houses = data.data?.filter((house) => user?.cart?.includes(house._id));
    console.log({ houses });
  }
  // if ()
  return (
    <HousesListingTemplate
      // houses={altHouses}
      houses={houses}
      header="Here are your favorites, ready to make a decision?"
    // useMap={useMap}
      leaveLink="Back to Exploring"
      subHeader="Your favorites"
    />
  );
};

export default Cart;

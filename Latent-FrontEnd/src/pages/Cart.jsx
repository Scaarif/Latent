import React from 'react';
import HousesListingTemplate from '../components/HousesListingTemplate';
import { altHouses } from '../constants';

const Cart = () => (
  <HousesListingTemplate
    houses={altHouses}
    header="Here are your favorites, ready to make a decision?"
    // useMap={useMap}
    leaveLink="Back to Exploring"
    subHeader="Your favorites"
  />
);

export default Cart;

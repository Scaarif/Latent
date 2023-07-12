import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md';
import { TestimonialV2 } from '../components/Testimonial';
import PaginatedListing from '../components/PaginatedListing';
import { houses } from '../constants';

import { useGetAgentQuery } from '../redux/services/latentAPI';

const Profile = () => {
  const { data: agent, isFetching, error } = useGetAgentQuery(4);
  // const agentId = 1;
  if (isFetching) return (<div><span>Loading agent info...</span></div>);
  if (error) {
    console.log('get agent failed: ', error);
    return (<div><span>Sorry, something went wrong, try again...</span></div>);
  }
  console.log('agent: ', agent);
  return (
    <div className="flex flex-col border-green w-full mb-8 m-4 md:mx-16">
      <div className="flex flex-col gap-2">
        <Link
          to="/explore"
          className="flex items-center gap-1 font-semibold text-green transition-color
        hover:text-md_green cursor-pointer"
        >
          <MdArrowForwardIos
            style={{ color: 'green', height: '16px', width: '16px', transform: 'rotate(180deg)' }}
          />
          Back to Listings
        </Link>
        <span className="flex items-center gap-2 font-semibold text-[24px] md:text-[32px] text-slate-600">
          Wahura Wamaingi
          <span className="text-sm p-1 px-2 bg-light_green">Agent</span>
        </span>
        <span className="text-sm text-s_gray transition-colors hover:text-md_green">
          <a href="#listings">12 Houses Listings</a>
        </span>
      </div>
      <div className="flex flex-col space-y-8 my-8 py-8">
        <h2 className="text-lg text-s_gray text-center mb-8">What other clients have to say about
          <span className="px-1.5">Wahura's</span>
          services
        </h2>
        <div className="flex flex-col md:flex-row gap-4 md:gap-2">
          {[1, 2, 3].map((review, i) => (
            <TestimonialV2
              key={i}
            />
          ))}
        </div>
      </div>
      <div id="listings" className="flex flex-col md:mb-8">
        <h2 className="text-lg text-s_gray text-center">Wahura's listed vacancies</h2>
        <PaginatedListing houses={houses} itemsPerPage="3" />
      </div>
    </div>
  );
};

export default Profile;

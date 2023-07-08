import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdArrowForwardIos, MdLocationOn, MdPayment, MdPushPin, MdBedroomParent, MdBathroom, MdExpandMore, MdStar } from 'react-icons/md';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

import PaginatedListing from '../components/PaginatedListing';
import { houses } from '../constants';
// import { house1 } from '../assets';

const Rating = ({ setRating, rating }) => {
  const [starred, setStarred] = useState(false);
  const handleClick = () => {
    setStarred(!starred);
    if (starred) {
      setRating(rating + 1);
    } else {
      setRating(rating - 1);
    }
    console.log(rating);
  };

  return (
    <MdStar
      onClick={handleClick}
      style={{ color: starred ? '#339D65' : 'gray', height: '20px', width: '20px' }}
    />
  );
};

const House = () => {
  const { houseId } = useParams();
  const house = houses.find((hse) => hse.id === Number(houseId));
  const [showReviews, setShowReviews] = useState(false);
  const [rateAgent, setRateAgent] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const handleCommenting = (e) => {
    setComment(e.target.value);
    console.log(comment);
  };
  // console.log(houseId)
  return (
    <div className="flex flex-col border-green w-full mt-4 mx-2 md:mx-16">
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
          { house.houseType }
          { house.shared && <span className="text-sm text-green p-1 px-2 bg-light_green">Roommate needed</span> }
        </span>
        <span className="flex items-center gap-1 text-sm text-s_gray transition-colors hover:text-md_green">
          <MdLocationOn style={{ color: 'gray', height: '16px', width: '16px' }} />
          { house.address}
        </span>
      </div>

      {/* House Images and agent details */}

      {/* <div className="flex flex-col md:flex-row my-8 gap-2 border"> */}
      <div className="grid md:grid-cols-3 my-8 gap-2">
        {/* <div className="w-full flex flex-initial flex-col gap-2 border border-green"> */}
        <div className="md:col-span-2 gap-2 rounded-sm overflow-hidden">
          <div className="flex">
            { house.images.length ? (
              <Swiper navigation modules={[Navigation]} className="mySwiper">
                {
                  house.images?.map((image, i) => (
                    <SwiperSlide key={i}><img src={image} alt="house" className="max-h-[400px] object-cover h-full w-full" /></SwiperSlide>
                  ))
                }
              </Swiper>
            ) : (
              <img src={house.coverImage} alt="house" className="max-h-[400px] object-cover w-full" />
            )}
          </div>
          {/* agent details */}
          <div className="flex flex-col gap-4 bg-white mt-4 p-4">
            <div className="flex gap-2 text-sm">
              <span className="text-s_gray">Listed by</span>
              <span className="font-semibold text-slate-700">Wahura Wamaingi</span>
            </div>

            {/* Rate the agent's service */}

            <div className="flex flex-col py-4">
              <div className="flex items-center gap-2">
                <span className="text-center text-green py-2 transition-colors
                hover:text-md_green cursor-pointer rounded-sm z-10"
                >
                  Rate the agent's services
                </span>
                <MdExpandMore
                  style={{ color: 'green', height: '24px', width: '24px' }}
                  onClick={() => setRateAgent(!rateAgent)}
                />
              </div>
              {
  rateAgent
                && (
                <div className="flex flex-col md:mx-4 p-2 md:p-4">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star, i) => (
                      <Rating
                        key={i}
                        rating={rating}
                        setRating={setRating}
                      />
                    ))}
                  </div>
                  <div className="flex">
                    <textarea
                      name="comment"
                      id=""
                      cols="60"
                      rows="5"
                      value={comment}
                      // onChange={(e) => setComment(e.target.value)}
                      onChange={handleCommenting}
                      placeholder="leave a comment"
                      className="border mt-2 rounded p-2 text-slate-600 focus:outline-none focus:border-light_green"
                    />
                  </div>
                </div>
                )
}
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold text-slate-700">What other customers have to say about the Agent</span>
              <MdExpandMore
                style={{ color: 'gray', height: '24px', width: '24px' }}
                onClick={() => setShowReviews(!showReviews)}
              />
            </div>
            <div className={`flex flex-col gap-4 py-4 smooth-transition ${showReviews ? 'h-full opacity-1' : 'h-0 opacity-0'}`}>
              <div className="flex flex-col gap-2 justify-start text-sm pr-4 md:pr-16 pb-4 border-b">
                <span className="text-s_gray">“I had a wonderful experience working with Wamaingi to find my new home. The agent really took the time to understand what was important to me and helped me find a home that was not only beautiful but also suited me, perfectly.” </span>
                <span className="self-end font-semibold text-s_gray">Felix Jimoh</span>
              </div>
              <div className="flex flex-col gap-2 justify-start text-sm md:pr-16 pr-4 pb-4 border-b">
                <span className="text-s_gray">“I had a wonderful experience working with Wamaingi to find my new home. The agent really took the time to understand what was important to me and helped me find a home that was not only beautiful but also suited me, perfectly.” </span>
                <span className="self-end font-semibold text-s_gray">Scaarif Ngache`</span>
              </div>
              <div className="flex flex-col gap-2 justify-start text-sm pr-4 md:pr-16 pb-4">
                <span className="text-s_gray">“I had a wonderful experience working with Wamaingi to find my new home. The agent really took the time to understand what was important to me and helped me find a home that was not only beautiful but also suited me, perfectly.” </span>
                <span className="self-end font-semibold text-s_gray">Alison James</span>
              </div>
            </div>
          </div>
        </div>

        {/* House Details */}

        <div className="w-full flex-1 flex flex-col py-2 px-4 bg-white rounded-sm">
          <div className="flex items-center gap-2 bg-light_green mt-2 p-2 rounded-sm">
            <MdPayment style={{ height: '20px', width: '20px', color: '#75BD97' }} />
            <span className="font-semibold text-green">{house.price} ksh/mth</span>
            <span className="font-semibold text-white bg-green px-4 py-1">Per Individual</span>
          </div>
          <div className="flex items-center gap-2 mt-2 p-2">
            <MdPushPin style={{ height: '20px', width: '20px', color: '#75BD97' }} />
            <span className="text-s_gray">on the <span className="font-semibold">{house.floor}th</span> Floor</span>
          </div>
          <div className="flex items-center gap-2 p-2">
            <MdBedroomParent style={{ height: '20px', width: '20px', color: '#75BD97' }} />
            <span className="text-s_gray"><span className="font-semibold">{house.numRooms}</span> Bedrooms</span>
          </div>
          <div className="flex items-center gap-2 p-2">
            <MdBathroom style={{ height: '20px', width: '20px', color: '#75BD97' }} />
            <span className="text-s_gray"><span className="font-semibold">{house.numBathrooms}</span> Bathrooms</span>
          </div>
          <span className="py-4 font-semibold text-slate-600">About this House</span>
          <span className="text-s_gray text-sm">{ house.description || 'Located in one of the safest areas of Nairobi, the apartment comes with  reliable piped water, complimentary borehole water and reliable electricity supply. Garbage collection and cleaning services are readily and affordably available. We have  a children playground in the compound as well as a mall just outside...' }</span>
          <div className="flex flex-col gap-1 py-16">
            <span className="text-sm text-s_gray">interested?</span>
            <span className="text-center text-white bg-green px-4 py-2 transition-colors
            hover:text-light_green cursor-pointer rounded-sm"
            >
              Request for agent contact Information
            </span>
          </div>
        </div>
      </div>

      {/* Similar listings page */}

      <div id="listings" className="flex flex-col py-8 md:mb-8 md:-mx-16 bg-light_green">
        <h2 className="text-lg font-semibold text-slate-600 text-center md:text-start md:px-16">Similar listings</h2>
        <PaginatedListing houses={houses} itemsPerPage="3" />
      </div>
    </div>
  );
};

export default House;


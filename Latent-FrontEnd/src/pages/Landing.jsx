import React, { useState } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import { BsLinkedin, BsFacebook, BsTwitter, BsInstagram } from 'react-icons/bs';
import SearchBar from '../components/SearchBar';
import { card1, card2, logo } from '../assets';
import Button from '../components/Button';
import HouseCard from '../components/HouseCard';
import Testimonial from '../components/Testimonial';

const Landing = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="w-full relative">

      {/* Hero section */}

      <div className="flex bg-hero-bg bg-cover h-[700px]">
        {/* Left */}
        <div className="flex-1 bg-gradient-to-r from-bg_color via-bg_color to-bg-transparent pl-16 py-16">
          <h1 className="font-bold text-[40px]">Hunt for Your next House Smarter, Quicker, Cheaper & Anywhere</h1>
          <p className="text-s_gray flex items-center py-24">
            <span className="font-bold text-[24px] text-green px-2 border-l-2">20k+</span>
            listed houses
          </p>
          <div className="flex absolute">
            <SearchBar />
          </div>
        </div>
        {/* Right */}
        <div className="flex-1 flex flex-col">
          <div className="flex">
            <img src={card1} alt="house1" className="h-[400px]" />
          </div>
          <div className="flex justify-end pr-4">
            <img src={card2} alt="house2" className="" />
          </div>
        </div>
      </div>

      {/* Services section */}

      <div className="bg-white border border-white">
        <div className="flex flex-col my-16 mx-16">
          <h1 className="text-center font-semibold text-[24px] text-green p-1">Our Services</h1>
          <p className="text-center text-sm text-s_gray">We make it easy and convenient for both landlords (& agents) and tenants</p>
          <div className="flex text-center mt-16 gap-8">
            {/* Tenants */}
            <div className="flex-1 flex flex-col space-y-4">
              {/* <h2><span className='pr-1 pb-1 border-b-2 border-green'>For</span>Tenants</h2> */}
              <h2 className="w-full p-1 bg-light_green rounded-sm">Tenants</h2>
              <div className="flex flex-col space-y-2 py-4 p-2">
                <h1 className="text-lg font-semibold text-slate-700">A new way to find your next home</h1>
                <p className="text-sm text-s_gray">No longer dread trying to find your dream home.  Easily and quickly find a house you love by exploring
                  our listed houses in the locations of your choosing and with the features you most desire  then contact
                  the agent and make the necessary arrangements to physically investigate the house.
                </p>
              </div>
              <div className="flex flex-col space-y-2 py-4 p-2">
                <h1 className="text-lg font-semibold text-slate-700">A convenient way to find a roommate</h1>
                <p className="text-sm text-s_gray">
                  Are you a student looking to save some cash by co-renting? Easily find a shared house to co-rent. No - You don’t have to be a student,
                  explore co-renting options and see if you like some....
                </p>
              </div>
              <div className="flex justify-center">
                <Button name="Explore" type="secondary" />
              </div>
            </div>

            {/* Agents & landlords */}

            <div className="flex-1 flex flex-col space-y-4">
              {/* <h2><span className='pr-1 pb-1 border-b-2 border-green'>For</span>Agents & landlords</h2> */}
              <h2 className="w-full p-1 bg-light_green rounded-sm">Agents & landlords</h2>
              <div className="flex flex-col space-y-2 py-4 p-2">
                <h1 className="text-lg font-semibold text-slate-700">A new way to find tenants</h1>
                <p className="text-sm text-s_gray">Make your houses visible to thousands of house hunters by posting them on
                  the site whenever they become vacant. Advertise your houses and attract the best of tenants...
                </p>
              </div>
              <div className="flex flex-col space-y-2 py-4 p-2">
                <h1 className="text-lg font-semibold text-slate-700">A convenient way to find a roommate</h1>
                <p className="text-sm text-s_gray">
                  Have a house and want to save some cash by rent sharing? Post your house and get a roommate hustle-free
                </p>
              </div>
              <div className="flex justify-center">
                <Button name="Try it out" type="light" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Houses listing section */}
      <div className="flex flex-col m-16">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center font-semibold text-[24px] text-green p-1">Listed Houses</h1>
          <p className="text-center text-sm text-s_gray">See the currently listed vacancies just in your current location</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <HouseCard roommate="true" />
          <HouseCard loggedIn="true" />
          <HouseCard />
          <HouseCard />
          <HouseCard roommate="true" />
          <HouseCard />
        </div>
        <div className="flex justify-end items-center p-8">
          <span className="mr-12 transition-colors hover:text-green cursor-pointer">see more ...</span>
        </div>
      </div>

      {/* Testimonials section */}
      <div className="flex flex-col bg-white">
        <div className="flex flex-col m-16">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-center font-semibold text-[24px] text-green p-1">What our customers say?</h1>
            <p className="text-center text-sm text-s_gray">Don't take our word for it, hear directly from our customer landlords, agents  and clients.</p>
          </div>
          <div className="flex space-x-4 mt-16">
            <Testimonial />
            <Testimonial />
            <Testimonial />
          </div>

          <div className="flex justify-center items-center gap-8 mt-8">
            <span className="rounded-full h-12 w-12 bg-light_green flex items-center justify-center">
              <MdArrowForwardIos
                style={{ color: hovered ? 'green' : 'black', height: '20px', width: '20px', transform: 'rotate(180deg)' }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              />
            </span>
            <span className="rounded-full h-12 w-12 bg-light_green flex items-center justify-center">
              <MdArrowForwardIos
                style={{ color: hovered ? 'green' : 'black', height: '20px', width: '20px' }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              />
            </span>
          </div>

        </div>
      </div>

      {/* Contact us section */}
      <div className="flex flex-col m-16">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center font-semibold text-[24px] text-green p-1">Contact Us</h1>
          <p className="text-center text-sm text-s_gray">We like hearing from our customers, write to us</p>
        </div>
      </div>

      {/* Footer section */}
      <div className="flex flex-col bg-green">
        <div className="flex justify-between text-white m-16">
          <div className="flex flex-col space-y-8">
            <span className="text-lg">Latent</span>
            <div className="flex space-x-4">
              <BsFacebook style={{ height: '20px', width: '20px' }} />
              <BsLinkedin style={{ height: '20px', width: '20px' }} />
              <BsTwitter style={{ height: '20px', width: '20px' }} />
              <BsInstagram style={{ height: '20px', width: '20px' }} />
            </div>
            <div className="flex">
              <Button type="light" name="Contact us" />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-lg">Navigation</span>
            <span className="">Home</span>
            <span className="">Services</span>
            <span className="">Contact us</span>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-lg">Company</span>
            <span className="">Home</span>
            <span className="">Services</span>
            <span className="">Contact us</span>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-lg">Support</span>
            <span className="">Contact us</span>
            <span className="">Login</span>
          </div>
        </div>
        <div className="flex justify-center text-white">
          <span className="text-sm">Copyright &copy; 2023. All rights reserved.</span>
        </div>
      </div>

    </div>
  );
};

export default Landing;

import React from 'react';
import { MdFormatQuote } from 'react-icons/md';

const Testimonial = () => (
  <div className="flex flex-col md:w-[400px] space-y-2 p-4 border-t md:border rounded-md relative">
    <span className="absolute -top-6 rounded-full h-12 w-12 bg-light_green flex items-center justify-center">
      <MdFormatQuote style={{ color: 'green', transform: 'rotate(180deg)', height: '24px', width: '24px' }} />
    </span>
    <span className="font-semibold text-slate-600 pt-4">Felix Jimoh</span>
    <span className="text-sm text-s_gray">“I had a wonderful experience working with Latent to find my new home. The agent really took the time to understand what was important to me and helped me find a home that was not only beautiful but also suited me, perfectly." </span>

  </div>
);

export default Testimonial;

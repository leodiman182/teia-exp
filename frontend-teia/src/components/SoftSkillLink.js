import React from 'react';
import { Link } from "react-router-dom";
import { FiChevronRight } from 'react-icons/fi';
import '../assets/css/reset.css';

export default function MainCard({ imageSource, h2, p, id }) {
  return (
    <div className="grid grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 my-10">
      <div className="relative min-h-44">
        <img className="h-full md:object-cover md:my-auto md:w-full lg:rounded-l-xl" alt={h2} src={imageSource} />
        <div className="absolute top-0 px-12 h-full bg-black bg-opacity-40 grid-rows-3 gap-2 lg:rounded-l-xl">
          <div className="h-1/4" />
          <p className="h-3/6 font-bold text-xl md:text-2xl text-center text-white md:px-2 lg:rounded-l-xl">
            {h2}
          </p>
          <div className="h-1/4" />
        </div>
      </div>
      <div className="flex flex-row text-md p-8 bg-tertiary opacity-100 text-center items-center md:justify-center md:px-4 lg:rounded-r-xl">
        <div className="">
          <p className="opacity-100 text-sm text-left md:pr-10 md:pl-6 md:text-lg">
            {p}
          </p>
        </div>
        <div className="flex flex-row justify-center">
          <Link to={`/experiences/ByCategory/${id}`}>
            <FiChevronRight className="arrow h-20 hover:scale-150 duration-150" />
          </Link>
        </div>        
      </div>    
    </div>
  )
}
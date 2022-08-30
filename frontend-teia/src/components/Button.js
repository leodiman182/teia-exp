import React from 'react';

export default function Button({ text, color, opacity, className, func }) {
  return (
    color === 'secondary' ?
      (<button className={` bg-secondary my-6 sm:text-sm lg:text-md xl:text-lg uw:text-xl px-6 py-2 text-white rounded-3xl opacity-${opacity} transition hover:opacity-100 hover:scale-110 ${className}`} onClick={func}>{text}</button>) :
      (<button className={` ${className} bg-${color} my-6 sm:text-sm lg:text-md xl:text-lg uw:text-xl px-6 py-2 text-white rounded-3xl opacity-${opacity} transition hover:opacity-100 hover:scale-110 ${className}`} onClick={func}>{text}</button>)
  )
}

import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/imgs/LOGO BCO PNG.png';
import Menu from './Menu';

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full bg-primary py-10">  
      <Link to="/">
        <img className="ml-4 md:mx-8 w-40 transition ease-in-out delay-100 hover:scale-110" src={Logo} alt="TeiaExp"></img>
      </Link>    
      <Menu />
    </header>
  )
}

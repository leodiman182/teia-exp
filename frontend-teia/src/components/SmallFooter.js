import React from 'react';
import { Link } from 'react-router-dom';
import LOGOSEC from '../assets/imgs/LOGO BCROSAO PNG.png'

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="bg-primary p-8">
      <div className="flex flex-col items-center">
        <Link to="/">
            <img className="w-24 hover:scale-110 duration-150 uw:w-36" src={ LOGOSEC } alt="TEIAEXP" />
          </Link>
        <span className="text-white text-right text-md mt-6 uw:text-lg">Copyright ©&nbsp; 
        { year } - TEIA Exp
        </span>
        <span className="text-white text-right text-md uw:text-lg">Desenvolvido por&nbsp;
          <a className="text-white text-right text-md font-bold" target="_blank" href="https://agatecnologia.com/" rel="noreferrer">
            <p className="inline-block hover:text-secondary duration-100">
              AGA Tecnologia
            </p>
          </a>
        </span>
      </div>
    </footer>
  )
}

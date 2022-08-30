import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import '../assets/css/Menu.css';
import TeiaContext from '../context/TeiaContext';
import LougoutIcon from './LougoutIcon';

function Menu() {
  const { userObj } = useContext(TeiaContext);
  const menuToggle = () => {
    const menu = document.querySelector('#nav-menu');
    const menuIcon = document.getElementById('icon-menu');
    const closeIcon = document.getElementById('icon-close');
    const html = document.querySelector('html');

    html.style.overflowY = "visible";
    if (menu.classList.contains('show')) {
      menu.classList.remove('show')
      html.style.overflowY = "visible";
      menuIcon.style.visibility = 'visible'
      closeIcon.style.visibility = 'hidden'
    } else {
      menu.classList.add('show')
      html.style.overflowY = "hidden"
      closeIcon.style.visibility = 'visible'
      menuIcon.style.visibility = 'hidden'
    }
  }

  useEffect(() => {
    document.querySelector('html').style.overflowY = "visible";
  })

  return (
    <>
      <div id="nav-menu" className="menu">
        <ul className="nav-list">
          <li>
            <Link className="list-item text-primary" to="/">PARA COLABORADORES</Link>
          </li>
          <li>
            <Link className="list-item text-primary" to="/companies">PARA EMPRESAS</Link>
          </li>
          <li>
            <Link className="list-item text-primary" to="/about">SOBRE NÓS</Link>
          </li>
          <hr />
          <li>
            <a target="_blank" href="https://www.teiaexp.com/blog" className="list-item text-primary" rel="noreferrer">BLOG</a>
          </li>
          <br />
          <br />
          <br />
          {
            userObj.name !== ''
              ? (
                <>
                  <div className="logged-in">
                    <div className="logged-in-box flex flex-col items-end">
                      <Link to="/profile">
                        <p className="logged-in-name hover:cursor-pointer hover:underline hover:underline-offset-1">{userObj.name}</p>
                      </Link>
                      <p className="logged-in-email">{userObj.email}</p>
                    </div>
                    <LougoutIcon />
                  </div>
                </>
              )
              : (
                <Link className="desktop-login text-primary" to="/login">
                  <p className="ml-2 login-link text-xs">Tem cadastro? <br />Faça seu login</p>
                </Link>
              )
          }

        </ul>
      </div>
      <div id="icon-close" className="icon">
        <IoClose
          onClick={menuToggle}
          className=" icon-close"
        />
      </div>
      <div id="icon-menu" className="icon">
        <BiMenu
          onClick={menuToggle}
          className=" icon-menu"
        />
      </div>
    </>
  )
}

export default Menu;
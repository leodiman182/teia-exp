import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import TeiaContext from '../context/TeiaContext';
import { MdLogout } from "react-icons/md";
import axios from 'axios';

function LougoutIcon({ color }) {
  const { setUserObj, userObj } = useContext(TeiaContext);
  function handleLogout() {
    axios.post("https://teiaexp.carteiraholder.com.br/laravel/public/api/logout", {}, {
      headers: {
        Authorization: 'Bearer ' + userObj.token
      }
    })
      .then(() => {
        setUserObj({
          id: '',
          name: '',
          token: '',
          avatarURL: '',
          email: '',
        })
        sessionStorage.clear()
      })
  }

  return (
    <Link to="/">
      <MdLogout onClick={handleLogout} className={color ? `text-${color} logout-icon md:h-7 hover:cursor-pointer` : `text-white logout-icon md:h-7 hover:cursor-pointer`} />
    </Link>
  )
}

export default LougoutIcon;
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import TeiaContext from '../context/TeiaContext'
import '../assets/css/file-upload.css';

import Header from '../components/Header'
import Historic from '../components/Historic'
import SmallFooter from '../components/SmallFooter'
// import { Link } from 'react-router-dom';
import LougoutIcon from '../components/LougoutIcon';
import defaultAvatar from '../assets/imgs/pics/img_568656.png'


function Profile() {
  const { userObj } = useContext(TeiaContext);
  const { id, token, name, email } = userObj;

  return (
    <>
      <Header />
      <main className="h-sreen my-16">
        <div className="flex flex-col items-center">
          <img id='output' className="rounded-full w-52 border border-4 border-secondary p-1" src={defaultAvatar} alt="avatar-img" />
          {/* <label className="flex flex-col text-lg text-center py-6 hover:cursor-pointer hover:underline hover:underline-offset-1 hover:text-primary" htmlFor="input-avatar-img">
            Faça upload do seu avatar
            <input className="" id="input-avatar-img" type="file" alt="input avatar image" />
          </label> */}
        </div>
        <div className="mt-6 mb-8 bg-tertiary mx-8 md:mx-24 lg:mx-14 py-4 rounded-xl px-2 uw:max-w-screen-xl uw:mx-auto">
          <h2 className="text-primary w-full font-bold text-2xl text-center mx-auto md:text-3xl py-2">{name}</h2>
          <h3 className="text-center text-xs md:text-md lg:text-lg mx-auto py-1 w-full">{email}</h3>

          {/* <Link to="/change-password">
            <p className="pt-8 text-lg text-primary mx-auto text-center hover:cursor-pointer hover:underline hover:underline-offset-1 hover:text-primary">Altere sua senha</p>
          </Link> */}
          <Historic id={id} token={token} />
        </div>
        <div className="w-full mx-auto flex justify-center">
          <LougoutIcon color="primary" />
        </div>
      </main>
      <SmallFooter />
    </>
  )
}

export default Profile;
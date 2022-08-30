import React, { useState } from 'react';
import TeiaContext from './TeiaContext';

function TeiaProvider({ children }) {
  const [URL, SETURL] = useState();
  const [userObj, setUserObj] = useState({
    id: sessionStorage.getItem('id') ? sessionStorage.getItem('id') : '',
    name: sessionStorage.getItem('name') ? sessionStorage.getItem('name') : '',
    token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
    avatarURL: sessionStorage.getItem('avatarURL') ? sessionStorage.getItem('avatarURL') : '',
    email: sessionStorage.getItem('email') ? sessionStorage.getItem('email') : '',
  });

  const context = {
    URL, SETURL, userObj, setUserObj
  }

  return (
    <TeiaContext.Provider value={context}>
      {children}
    </TeiaContext.Provider>
  )
}

export default TeiaProvider;
import React, { useState, useCallback } from 'react';
import Button from './Button';
import InputEmailForm from './InputEmailForm';
import axios from 'axios';

export default function ContactForm() {
  const [msg, setMsg] = useState('');
  const [parentState, setParentState] = useState('');
  const wrapperSetParentState = useCallback(val => {
    setParentState(val);
  }, [setParentState]);


  function handleClick(event) {
    event.preventDefault();
    setMsg('')
    axios.post(`https://teiaexp.carteiraholder.com.br/laravel/public/api/Presentation`, { ...parentState })
      // axios.post("http://localhost:8000/api/Presentation", { email: parentState })
      .then(() => {
        setMsg('Solicitação enviada com sucesso!')
      })
      .catch(err => {
        setMsg(err.response.data.message)
      })
  }

  return (
    <div className="pt-10 text-center bg-primary w-full border border-primary border-6">
      <h2 className="text-xl font-bold text-white sm:text-xl md:text-xl uw:text-2xl">Solicite uma apresentação</h2>
      <h4 className="text-gray-200 mx-auto w-full mt-4 sm:text-md md:text-lg uw:text-xl">Existimos para garantir que todos possam desenvolver habilidades comportamentais</h4>
      <form id="contactForm" className="w-50 mt-2 py-2">
        <InputEmailForm
          placeholder="Email Corporativo"
          parentState={parentState}
          parentStateSetter={wrapperSetParentState}
          parentClass="text-white mx-auto md:text-md mb-2 w-4/6 bg-primary border-2 border-secondary text-white text-sm rounded-3xl block px-3 py-2 focus:outline-none uw:text-lg"
        />
        <span className='text-white'>{msg}</span>
        <div className="flex flex-col items-center">
          <Button text="Solicitar" color="secondary" className="" func={handleClick} />
        </div>
      </form>
    </div>
  )
}

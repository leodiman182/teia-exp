/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import SmallFooter from '../components/SmallFooter';
// import { Link } from "react-router-dom";
import Button from '../components/Button';
import InputEmailForm from '../components/InputEmailForm';
import '../assets/css/blobs.css';

// import MAINIMAGE from '../assets/imgs/MAINIMAGE.png';
import SoftSkillLink from '../components/SoftSkillLink';
import Carousel from '../components/Carousel';

function Main() {
  const [SoftSkills, SetSoftSkills] = useState([]);

  const [msg, setMsg] = useState('');
  const [parentState, setParentState] = useState('');
  const wrapperSetParentState = useCallback(val => {
    setParentState(val);
  }, [setParentState]);

  function handleClick(event) {
    event.preventDefault();
    console.log(parentState);
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

  useEffect(() => {
    axios.get(`https://teiaexp.carteiraholder.com.br/laravel/public/api/ExperienceCategory`)
      .then(res => {
        const SoftSkills = res.data;
        SetSoftSkills(SoftSkills)
      })
  }, [])

  return (
    <>
      <Header />
      <main className="items-center justify-evenly mx-auto mt-1">
        <Carousel />
        <section className="flex flex-col justify-center mx-auto my-4 max-w-screen-lg" id="cards">
          {
            SoftSkills.map((softskill) => (softskill.active === true && <SoftSkillLink
              key={softskill.id}
              id={softskill.id}
              imageSource={`https://teiaexp.carteiraholder.com.br/laravel/storage/app/public/${softskill.image}`}
              h2={softskill.title}
              p={softskill.description}
            />))
          }
        </section>
        <section className="md:mt-12">
          <article className="md:w-full text-center px-10 mt-10 mb-14 xl:mb-8 flex-1 md:mb-10">
            <h3 className="text-3xl md:text-4xl font-bold">
              Seu caminho para o bem-estar
            </h3>
            <p className="mt-5 md:mx-auto md:w-2/4 md:mt-8 text-lg mac:text-xl uw:px-64 uw:text-2xl">
              Trabalhar habilidades comportamentais te ajuda não só profissionalmente mas também a viver melhor!
            </p>
            <a target="_blank" rel="noreferrer" href="https://www.teiaexp.com/blog">
              <Button opacity="10" color="primary" text="Leia mais no Blog" />
            </a>
          </article>
        </section>
        <section className="text-center -mt-16 hd:-mt-36">
          <svg id="wave1" className="w-full -z-10" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="#FBD8CA" fillOpacity="1" d="M0,96L30,112C60,128,120,160,180,160C240,160,300,128,360,106.7C420,85,480,75,540,112C600,149,660,235,720,240C780,245,840,171,900,154.7C960,139,1020,181,1080,181.3C1140,181,1200,139,1260,144C1320,149,1380,203,1410,229.3L1440,256L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
          </svg>
          <div className="bg-tertiary">
            <h3 className="text-center text-lg font-bold xl:text-xl mac:text-2xl uw:text-3xl">Gostaria de usufruir de todos os benefícios do TEIAExp ?</h3>
            <div className="px-5">
              <p className="my-4 text-center text-md mac:text-lg uw:text-2xl">Indique sua empresa</p>
              <InputEmailForm
                parentState={parentState}
                parentStateSetter={wrapperSetParentState}
                parentClass="text-black  mx-auto my-4 w-full bg-tertiary border-2 border-secondary text-black text-sm rounded-3xl block px-2 py-1 focus:outline-none md:max-w-screen-sm uw:text-xl"
              />
            </div>
            <p className='text-black'>{msg}</p>
            <Button opacity="90" color="primary" text="Enviar" func={handleClick} />
          </div>
        </section>
      </main>
      <SmallFooter />
    </>
  )
}

export default Main;

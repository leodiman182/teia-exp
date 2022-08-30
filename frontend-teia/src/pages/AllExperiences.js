/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExpCard from '../components/ExpCard';
import axios from 'axios';
import { useState } from 'react';
// import TeiaContext from '../context/TeiaContext';

function AllExperiences() {
  const [experiences, setExperiences] = useState([]);
  // const { URL } = useContext( TeiaContext );


  useEffect(() => {
    axios.get(`https://teiaexp.carteiraholder.com.br/laravel/public/api/Experience`)
      .then(res => {
        const Experiences = res.data;
        setExperiences(Experiences);
      })
  }, []);

  return (
    <>
      <Header />
      <section className="mx-auto max-w-screen-xl my-8 md:mb-2">
        <h3 className="mb-8 text-center text-2xl font-bold px-8">Nós somos a soma total das nossas experiências</h3>
        <p className="text-center text-lg px-6">Filtre as experiências pelas habilidades que gostaria de desenvolver ou navegue pelas opções!</p>
      </section>
      <section className="mx-auto max-w-screen-lg my-10 md:my-0 md:mb-8 md:flex md:justify-center md:flex-wrap">
        {
          experiences
            .map(exp => <ExpCard
              id={exp.id}
              key={exp.id}
              h4={exp.title}
              p={exp.description}
              imageSource={`https://teiaexp.carteiraholder.com.br/laravel/storage/app/public/${exp.image}`}
            />)
        }
      </section>
      <Footer />
    </>
  )
}

export default AllExperiences;
import React from 'react';
import Header from '../components/Header';
import SmallFooter from '../components/SmallFooter';
import  jumpingImg from '../assets/imgs/illustrations/jumping-2194230.png';
import Button from '../components/Button';
import '../assets/css/reset.css'
import '../assets/css/svg.css';
import '../assets/css/blobs.css';


function About() {
  return (
    <>
      <Header/>
      <section className="mx-auto sm:-mb-12">
        <div className="mx-auto bg-tertiary pt-8">
          <h3 className="mb-8 text-center text-3xl font-bold">Oie, nós somos a <br />TEIA Exp!</h3>
          <article className="flex flex-col md:flex-row md:px-10 px-6 uw:flex-col max-w-screen-lg mx-auto">
            <p className="text-center text-lg md:pt-4 md:px-4 mac:px-20 md:text-left uw:px-48 uw:text-xl z-10">
              Empreendemos durante a vida universitária e identificamos que existe um "gap" muito grande entre o que se ensina na faculdade e a vida profissional. Entendemos que as competências mais exigidas no mercado de trabalho hoje são subjetivas e a melhor forma de aprendê-las é consumindo experiências.</p>
            <p className="text-center text-lg pt-4 md:px-4 mac:px-20 md:text-left uw:px-48 uw:text-xl z-10">
              Somos apaixonados por desenvolvimento humano, estudamos em escolas construtivistas e estamos revolucionando a forma que as empresas desenvolvem seus colaboradores para as competências mais exigidas alinhas aos pilares culturais das empresas.
            </p>
          </article>
        </div>
        <svg className="w-full -z-10 md:-mt-8 mac:-mt-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#FBD8CA" fill-opacity="1" d="M0,192L120,202.7C240,213,480,235,720,213.3C960,192,1200,128,1320,96L1440,64L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
        </svg>
      </section>
      <section className="flex flex-col md:flex-row md:items-center md:justify-center md:mt-8 xl:-mt-8 max-w-screen-xl mx-auto">
        <img className="w-full sm:w-1/2 lg:max-w-sm mx-auto" src={ jumpingImg } alt="jumping-illustration" />
        <article className="flex flex-col text-center md:text-left px-8 py-4">
          <h3 className="text-xl font-bold">
            Acreditamos que todos podem ser criativos e empáticos
          </h3>
          <p className="text-lg sm:text-xl py-4">
            Existimos para garantir que todos possam desenvolver habilidades e experimentarem o mundo real.
            <br />
            Com a volta das atividades após um longo e triste período de reclusão, o TEIA Exp vai conectar pessoas e lugares para estimular um crescimento mais humano nas empresas!
            <br />
            Existimos para garantir que todos possam desenvolver habilidades e experimentarem o mundo real.
          </p>
          </article>
      </section>  
      <div className="mx-auto text-center">
        <a target="_blank" href="https://www.teiaexp.com/blog" className="text-primary" rel="noreferrer">
          <Button color="secondary" text="Blog" /> 
        </a>      
      </div>
      <SmallFooter />  
    </>
  )
}

export default About;

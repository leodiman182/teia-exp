import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from "react-router-dom";
import Button from '../components/Button';
import { HiOutlineOfficeBuilding, HiOutlineUserGroup } from "react-icons/hi";

import MAINIMAGE from '../assets/imgs/MAINIMAGE.png';
// import COMPANYPIC from '../assets/imgs/pics/COMPANYPIC.jpg'
import DEVICES from '../assets/imgs/illustrations/DEVICES.png';
import FLUXDESKTOP from '../assets/imgs/illustrations/FLUXDESKTOP.png';
import FLUXMOBILE from '../assets/imgs/illustrations/FLUXMOBILE.png';
import GRAPHIC from '../assets/imgs/illustrations/Gráfico.png'
import FILOGO from '../assets/imgs/illustrations/logo Founder Ins.png'
import GRAPHIC1 from '../assets/imgs/illustrations/Grafico - coluna 1.png';
import GRAPHIC2 from '../assets/imgs/illustrations/Grafico - coluna 2.png';
import GRAPHIC3 from '../assets/imgs/illustrations/Grafico - coluna 3.png';
import GRAPHIC4 from '../assets/imgs/illustrations/Grafico - coluna 4.png';

import '../assets/css/svg.css';

function ForCompanies() {
  return (
    <>
      <Header/>
      <main className="items-center justify-evenly mx-auto md:flex-row">
        <section className="flex flex-col lg:flex-row-reverse sm:p-14 md:items-center max-w-screen-xl mx-auto mt-8 md:mt-0">
          <aside>
              <img className="px-4 md:max-w-xl md:p-0" src={ MAINIMAGE } alt="Ilustração 1" />
          </aside>               
          <article className="text-left px-10 mt-4 flex-1 md:items-left">
              <h3 className="text-3xl font-bold md:text-left sm:text-3xl uw:text-4xl">
                  Conecte seus colaboradores à experiências transformadoras
              </h3>
              <p className="mt-5 md:text-left sm:text-xl md:mb-8 lg:text-xl uw:text-2xl">
                  Por meio da plataforma TEIA, desenvolva seu time para as competências e habilidades mais valorizadas da atualidade
              </p>
              <Link to="/">
                  <Button color="secondary" text="Quero saber mais" opacity="70" className="" func="" />
              </Link>
          </article>
        </section>
        <section className="flex flex-col -my-16 md:-my-44 lg:-my-52">
          <svg className="primary-wave1 w-full -z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#5C3339" fill-opacity="1" d="M0,288L60,277.3C120,267,240,245,360,250.7C480,256,600,288,720,272C840,256,960,192,1080,170.7C1200,149,1320,171,1380,181.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
          <article className="bg-primary">
            <h3 className="my-4 text-white text-center text-2xl sm:text-2xl font-bold md:m-0 md:text-3xl uw:text-4xl">Pensando na sua empresa</h3>
            <div className="md:flex md:flex-row md:items-start md:justify-center md:mt-0 md:w-full max-w-screen-xl mx-auto">
              <div className="flex flex-col items-center py-4">
                  <HiOutlineUserGroup />
                  <h4 className="text-center text-white font-bold py-2 md:py-6 sm:text2xl md:text-2xl uw:text-3xl">Colaborador</h4>
                  <p className="text-center text-white px-10 sm:text-lg md:text-xl md:px-4 lg:text-lg xl:px-20 uw:text-2xl">Potencialize a descoberta de habilidades e comportamentos de seus colaboradores. Um benefício flexível e adaptado para que cada um possa gerenciar suas próprias trilhas
                  </p>
              </div>
              <div className="flex flex-col items-center py-4">
                  <HiOutlineOfficeBuilding />
                  <h4 className="text-center text-white font-bold py-2 md:py-6 sm:text2xl md:text-2xl uw:text-3xl">RH e Gestores</h4>
                  <p className="text-center text-white px-10 sm:text-lg md:text-xl md:px-4 lg:text-lg xl:px-20 uw:text-2xl">Entregue relatórios e feedbacks preciosos sobre o aprendizado de cada time auxiliando o departamento de RH. A TEIA Exp trabalha junto com sua empresa para fomentar inovação e engajamento dos funcionários</p>
              </div>
            </div>
          </article>
          <svg className="primary-wave2 w-full -z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#5C3339" fill-opacity="1" d="M0,192L60,192C120,192,240,192,360,165.3C480,139,600,85,720,64C840,43,960,53,1080,64C1200,75,1320,85,1380,90.7L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
          </svg>
        </section>
        <section className="py-8 max-w-screen-xl mx-auto md:rounded-xl">
          <h2 className="my-4 text-center text-2xl font-bold sm:my-12 sm:text-2xl lg:text-3xl">Para usar, é simples:</h2>
          <img src={ FLUXDESKTOP } alt="Passo a passo Teiaexp" className="hidden invisible py-10 px-8 mac:px-0 md:mx-auto lg:block lg:visible"/>
          <img src={ FLUXMOBILE } alt="Passo a passo Teiaexp" className="block visible lg:hidden lg:invisible px-4 sm:px-36 md:px-48"/>
        </section>
        {/* <hr className="divide-secondary md:hidden md:invisible" /> */}
        <section className="flex flex-col items-center lg:flex-row uw:mt-4">
          <img className="mx-auto sm:w-96 md:max-w-md uw:w-full" src={ DEVICES } alt="Ilustração de cartão"/>
          <div className="text-center md:text-left md:px-2 uw:pr-96">
              <p className="font-bold px-10 text-xl sm:text-2xl mac:pr-72 uw:pr-2/3">Uma gama de opções de vivências inspiradoras para seus colaboradores a partir de R$300 mensais</p>
              <p className="px-10 text-lg sm:text-xl">(Planos a partir de 10 vidas)</p>
              <Button className="md:text-xl md:ml-8" color="primary" text="Solicitar uma proposta" opacity="100" />
          </div>
        </section>
        <section className="text-center md:-mt-10 mac:-mt-24">
          <svg className="tertiary-wave w-full -z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#FBD8CA" fill-opacity="1" d="M0,256L48,234.7C96,213,192,171,288,165.3C384,160,480,192,576,192C672,192,768,160,864,122.7C960,85,1056,43,1152,26.7C1248,11,1344,21,1392,26.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
          <article className="bg-tertiary px-10 md:px-0 md:-mt-10">
            <h3 className="text-center text-2xl sm:text-2xl font-bold mac:text-3xl">Por que a experiência dos colaboradores importa?</h3>
            <p className="mt-4 text-center text-lg sm:text-lg md:px-8 mac:text-2xl">
              Quando as pessoas estão felizes elas se dedicam mais ao seu trabalho.
              <br/>
              Investir em vivências para os colaboradores cria uma força de trabalho mais engajada e motivada
            </p>
            <img className="hidden invisible mx-auto md:visible md:block w-full max-w-screen-lg" src={ GRAPHIC } alt="Pesquisa Soft Skills" />
            <div className="w-full flex flex-col justify-evenly items-center md:mt-8 md:hidden md:invisible">
              <img className="max-w-xs sm:px-18 px-16 pt-4" src={ GRAPHIC1 } alt="Pesquisa Soft Skills - COLUNA 1" />
              <img className="max-w-xs sm:px-18 px-16 py-4" src={ GRAPHIC2 } alt="Pesquisa Soft Skills - COLUNA 2" />
              <img className="max-w-xs sm:px-18 px-16 py-4" src={ GRAPHIC3 } alt="Pesquisa Soft Skills - COLUNA 3" />
              <img className="max-w-xs sm:px-18 px-16 py-4" src={ GRAPHIC4 } alt="Pesquisa Soft Skills - COLUNA 4" />
            </div>
            <div className="py-8">
              <p className="font-bold text-primary text-center mx-auto text-sm md:text-lg">Parceiro:</p>
              <img className="mx-auto w-36 md:w-48 text-primary" src={ FILOGO } alt="Founder Institute Logo" />
            </div>
          </article>
        </section>
      </main>
      <Footer />      
    </>
  )
}

export default ForCompanies;

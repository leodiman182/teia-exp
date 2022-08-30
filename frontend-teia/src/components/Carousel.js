/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Carousel.css'

function Carousel() {
  const [imageURL, SetImageURL] = useState('https://images.unsplash.com/photo-1550026593-cb89847b168d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
  const [imageIndex, SetImageIndex] = useState(0);

  useEffect(() => {
    function handleImageChange() {
      SetImageURL(bgImages[imageIndex])
    }
    setTimeout(handleImageChange, 4000);
    imageIndex === 3 ? SetImageIndex(0) : SetImageIndex(imageIndex + 1);
  }, [imageURL])

  const bgImages = [
    'https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1496886077455-6e206da90837?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1590605105526-5c08f63f89aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1550026593-cb89847b168d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  ];

  return (  
    <div className="carousel-dur relative overflow-hidden bg-no-repeat bg-cover ease-in" style= { {
      backgroundPosition: '50%',
      backgroundImage: `url(${imageURL})`,
      height: '450px',
    } }
    >
      <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.65)'}}>
        <div className="flex justify-center items-center h-full md:p-20">
          <div className="text-center text-white px-6 md:px-12">
            <h1 className="text-3xl font-bold mt-0 mb-6 px-16 uw:text-4xl">Entenda o mundo através de experiências</h1>
            <h3 className="text-xl mb-8 px-16 xl:px-64 uw:text-2xl">
              Vá além.
              <br />
              Surpreenda-se com novas habilidades e transforme sua visão de mundo</h3>
            <Link to="/experiences">
              <button type="button"
                className="inline-block px-6 py-2.5 border-2 border-white text-white font-medium text-md leading-tight uppercase rounded-2xl hover:bg-white hover:bg-opacity-100 hover:text-black hover:scale-110 focus:outline-none focus:ring-0 transition duration-150 ease-in-out uw:text-xl"
                data-mdb-ripple="true" data-mdb-ripple-color="light">
                Quero saber mais
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carousel;
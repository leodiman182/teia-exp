import React from 'react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

export default function ExpCard({ h4, imageSource, p, id}) {
  return (
    <>
      <div className="flex flex-col items-center text-center rounded-xl mx-8 my-12 shadow shadow-lg md:max-w-sm">
        <img src={ imageSource } alt="Aula de cerâmica" className="rounded-t-xl"/>
        <h4 className="text-center text-2xl font-bold px-4 py-8">{h4}</h4>
        <p className="px-6">{p}.</p>
          <Link to={`/exp/${id}`}>
            <Button color="secondary" text="Mais detalhes" className="w-44" />  
          </Link>
        </div>     
    </>
  )
}

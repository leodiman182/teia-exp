/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import TeiaContext from '../context/TeiaContext';


function Exp() {
  const msgWhatsApp = "Através da TeiaExp estou adquirindo a experiencia "
  const navigate = useNavigate();
  const { userObj } = useContext(TeiaContext);
  const { id } = useParams();
  const [exp, setExp] = useState({});
  const [tags, setTags] = useState([]);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [Msg, setMsg] = useState('');

  useEffect(() => {
    axios.get(`https://teiaexp.carteiraholder.com.br/laravel/public/api/Experience/${id}`)
      .then(res => {
        const element = res.data;
        setExp(element[0]);
        setTags(JSON.parse(element[0].tags));
      });
  }, []);

  function schedule() {
    if (userObj.id === '') {
      navigate('/login')
      return
    }
    let dataForm = new FormData();
    dataForm.append(`value`, exp.price);
    dataForm.append(`experience_id`, exp.id);
    dataForm.append(`user_id`, userObj.id);

    const headers = { headers: { 'Authorization': 'Bearer ' + userObj.token } }
    setMsg('')
    axios.post(`https://teiaexp.carteiraholder.com.br/laravel/public/api/Debt/setExperience`, dataForm, headers)
      .then(({ data }) => {
        // console.log(data);
        if (parseFloat(data[0].transaction_id) > 0) {
          setShowWhatsApp(true)
          setMsg('Compra realizada com sucesso!')
        }
      })
      .catch((err => {
        setMsg(err.response.data.message)
        // console.log(err.response.data.message);
      }));
  }

  return (
    <>
      <Header />
      {exp.length !== 0 && (
        <section className="flex flex-col items-center mx-auto">
          <div className="relative md:w-full">
            <img src={`https://teiaexp.carteiraholder.com.br/laravel/storage/app/public/${exp.image}`} alt={exp.title} className="md:h-full md:w-full mac:h-96 md:object-cover" />
            <svg className="absolute w-full -bottom-2 md:bottom-0 lg:-bottom-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="#fff" fill-opacity="1" d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,224C672,235,768,245,864,256C960,267,1056,277,1152,272C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
          <div className="grid md:grid-cols-2 px-8">
            <article className="text-left md:px-10 uw:px-48">
              <h4 className="text-2xl font-bold py-8 md:pb-4">{exp.title}</h4>
              <p className="sm:text-md mac:text-lg">{exp.description}</p>
              <div id="skills" className="my-8 flex flex-wrap text-center">
                {tags.map(tag => (
                  <Link to={`/experiences/ByTag/${tag.id}`}>
                    <p className="font-bold text-xl text-secondary opacity-80 p-2 hover:scale-110 hover:opacity-100 duration-150 mac:text-2xl">{tag.description}</p>
                  </Link>
                ))}
              </div>
            </article>
            <aside className="flex justify-left md:px-0 hover:scale-105 duration-150">
              <div id="exp-info-card" className="mt-6 mb-2 shadow shadow-lg p-4 md:mb-8">
                <h4 className="text-lg sm:text-lg md:text-sm mac:text-lg font-bold py-2">Duração:</h4>
                <p className="sm:text-xl md:text-md">{exp.duration}</p>
                <h4 className="text-lg sm:text-lg md:text-sm mac:text-lg font-bold py-2">Localização</h4>
                <p className="sm:text-xl md:text-md">{exp.localization}</p>
                <h4 className="text-lg sm:text-lg md:text-sm mac:text-lg font-bold py-2">Horário que a experiência costuma acontecer:</h4>
                <p className="sm:text-xl md:text-md">
                  {exp.when}
                </p>
                {
                  userObj.name !== '' && (<p className='text-xl mt-2'>
                    <b>

                      Valor: {' '}
                      <span className=''>
                        {parseFloat(exp.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    </b>
                  </p>)
                }
              </div>

            </aside>
          </div>


          {
            !showWhatsApp && (<Button color="secondary" text="Agendar" className="w-44" func={schedule} />)
          }

          {
            Msg && (<p>{Msg}</p>)
          }
          {
            showWhatsApp && Msg && (<p>Enviamos um e-mail com os dados de sua compra!!!</p>)
          }

          {
            showWhatsApp &&
            (<div className='text-center'>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://api.whatsapp.com/send/?phone=${String(exp.whatsapp).replaceAll('+', '').replaceAll('-', '').replaceAll('.', '')}&text=` + msgWhatsApp + exp.experience_title}
              >
                <img src='https://www.lajescapela.com.br/wp-content/uploads/2014/03/whatsapp-botao.png' alt="botão whatsapp" className='h-14'></img>

              </a>
            </div>)
          }
          <Link to="/experiences">
            <Button color="primary" text="Mais experiências" className="w-48" />
          </Link>
        </section>
      )}
      <Footer />
    </>
  )
}


export default Exp;

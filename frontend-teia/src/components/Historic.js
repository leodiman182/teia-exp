import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsWhatsapp } from "react-icons/bs";

export default function Historic({ id, token }) {
  const [historic, setHistoric] = useState([]);
  const [balance, setBalance] = useState([]);
  const msgWhatsApp = "Através da TeiaExp estou adquirindo a experiencia "
  useEffect(() => {
    axios.get(
      `https://teiaexp.carteiraholder.com.br/laravel/public/api/Transaction/getByUserId/${id}`,
      { headers: { 'Authorization': 'Bearer ' + token } }
    )
      .then(({ data }) => {
        setHistoric(data.transactions)
        // console.log(data.transactions);
      })

    axios.get(
      `https://teiaexp.carteiraholder.com.br/laravel/public/api/Transaction/getBalance/${id}`,
      { headers: { 'Authorization': 'Bearer ' + token } }
    )
      .then(({ data }) => {
        setBalance(data[0].balance)
        // console.log(data);
      })


  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 
  return (
    <>
      <p className='text-center mt-4 items-center flex flex-row justify-center font-medium'>
        Saldo:
        <span className="text-3xl text-primary px-2">
          {' ' + parseFloat(balance).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
      </p>
      <hr className='m-4'></hr>
      <p className='text-center'> <b>Histórico de compras</b></p>
      <div className="m-8 flex flex-col bg-white p-4 rounded-3xl">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-12 md:w-48 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300 p-8">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0 "
                  >
                    Data
                  </th>
                  <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                    Experiência
                  </th>
                  <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                    Valor
                  </th>
                  <th scope="col" className="py-3.5 px-3 text-sm font-semibold text-gray-900 mx-auto">
                    WhatsApp
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {historic.length > 0 && historic.map((response) => (
                  <tr key={response.created_at}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 mx-auto">
                      {new Date(response.created_at).toLocaleDateString('pt-br', {
                        timeZone: 'America/Sao_Paulo',
                        hour12: true,
                      })}
                      {' '}
                      <br />
                      {new Date(response.created_at).toLocaleTimeString('pt-br')}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                      {response.experience_title ? response.experience_title : 'Crédito'}
                    </td>
                    <td className={'whitespace-nowrap py-4 px-3 text-sm text-' + (parseFloat(response.value) > 0 ? 'green' : 'red') + '-600'}>
                      {parseFloat(response.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm">
                      {
                        response.whatsapp && (
                          <a href={'https://api.whatsapp.com/send/?phone=' + response.whatsapp + '&text=' + msgWhatsApp + response.experience_title} target="_blank" rel="noreferrer">
                            <BsWhatsapp className="text-black w-5 h-5 mx-auto" />
                          </a>
                        )
                      }


                    </td>
                  </tr>
                ))}
              </tbody>
              {/* {historic && historic.length > 0} */}
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

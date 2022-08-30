import React from 'react';

export default function Schedule() {
  return (
    <>
      <div className="p-10">
          <h3>Agendamento</h3>
          <form id="schedule-form">
            <label htmlFor="">
              Nome Completo:
              <input id="form-name" type="text" />
            </label>
            <label htmlFor="">
              Empresa:
              <input id="form-company" type="text" />
            </label>
            <label htmlFor="">
              Endereço:
              <input id="form-address" type="text" />
            </label>
            <label htmlFor="">
              Email de registro no TEIA Exp.
              <input id="form-email" type="email" />
            </label>
            <label htmlFor="">
              Não pode nessas horas e dias? Diga-nos qual a sua disponibilidade na semana e no final de semana:
              <input id="form-" type="textarea" />
            </label>
          </form>
      </div>
    </>
  )
};

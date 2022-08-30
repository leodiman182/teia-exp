import React, { useRef, useState, useEffect } from 'react';

export default function InputEmailForm({ parentStateSetter, parentClass, placeholder }) {
  const childRef = useRef();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [companyRole, setCompanyRole] = useState('');

  useEffect(() => {
    parentStateSetter({
      email,
      name,
      role: companyRole
    });
  }, [parentStateSetter, email, name, companyRole]);

  const onSliderChangeHandlerEmail = e => {
    setEmail(e.target.value);
  };

  const onSliderChangeHandlerName = e => {
    setName(e.target.value);
  };

  const onSliderChangeHandlerCompanyRole = e => {
    setCompanyRole(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        id="name"
        className={`${parentClass}`}
        placeholder="Nome"
        value={name}
        ref={childRef}
        onChange={onSliderChangeHandlerName}
        required
      />
      <input
        type="email"
        id="email"
        className={`${parentClass}`}
        placeholder="Email corporativo"
        value={email}
        ref={childRef}
        onChange={onSliderChangeHandlerEmail}
        required
      />
      <select
        className={` ${parentClass}`}
        name="company-role"
        id="company-role"
        value={companyRole}
        onChange={(event) => {
          onSliderChangeHandlerCompanyRole(event)
          event.target.value !== ''
            ? document.getElementById('company-role').classList.remove('text-gray-400') && document.getElementById('company-role').classList.add('text-black')
            : document.getElementById('company-role').classList.remove('text-black') && document.getElementById('company-role').classList.add('text-gray-400')
        }}
      >
        <option className="text-gray-400" value="" disabled selected hidden>Como você contribui com a sua empresa?</option>
        <option className="text-white px-2 py-1" value="RH">RH</option>
        <option className="text-white px-2 py-1" value="C-Level">C-Level</option>
        <option className="text-white px-2 py-1" value="Colaborador">Colaborador</option>
      </select>
    </>
  )
}
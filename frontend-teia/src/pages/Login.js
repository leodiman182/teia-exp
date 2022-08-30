import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Button from '../components/Button';
import { TiHome } from "react-icons/ti";
import LOGOSEC from '../assets/imgs/LOGO BCO PNG.png'
import axios from 'axios';
import TeiaContext from '../context/TeiaContext'

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUserObj } = useContext(TeiaContext);

  function handleChange({ target: { name, value } }) {
    name === 'username' ? setUsername(value) : setPassword(value)
  }

  function handleClick(event) {
    event.preventDefault();
    setMessage();

    axios.post(`https://teiaexp.carteiraholder.com.br/laravel/public/api/login-collaborator`, {
      email: username,
      password: password,
      remember: false,
    }).then(({ data }) => {
      setUserObj({
        id: data.user.id,
        name: data.user.name,
        token: data.token,
        email: data.user.email,
        avatarURL: '',
      })

      sessionStorage.setItem('id', data.user.id);
      sessionStorage.setItem('name', data.user.name);
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('email', data.user.email);
      sessionStorage.setItem('avatarURL', '');

      navigate(-1);
    }).catch(error => {
      console.log(error);
      setMessage('Usuário e/ou senha inválidos');
    })
  }

  return (
    <>
      <main className="bg-primary w-full h-screen text-center md:h-none">
        <Link to="/">
          <TiHome style={{
            color: 'white',
            width: '50x',
            'paddingTop': '20px',
            margin: '0 auto'
          }} />
        </Link>
        <section className="flex flex-col justify-center mt-48 md:mt-12">
          <img src={LOGOSEC} alt="Teia exp" className="w-44 my-8 self-center" />
          <form action="submit">
            <input
              type="email"
              id="username"
              name="username"
              value={username}
              className="mx-auto mb-2 w-3/6 bg-primary border-2 border-secondary text-white text-sm rounded-3xl block px-3 py-2 focus:outline-none"
              placeholder="Email corporativo"
              onChange={handleChange}
              required={true}
            />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="mx-auto mb-2 w-3/6 bg-primary border-2 border-secondary text-white text-sm rounded-3xl block px-3 py-2 focus:outline-none"
              placeholder="Senha"
              required
            />
            {
              message && (
                <p className="text-white">
                  {message}
                </p>
              )
            }
            <Button color="tertiary" text="Entrar" className="text-primary font-bold" func={handleClick} />
          </form>
        </section>
      </main>
    </>
  )
}

export default Login;

/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Main from './pages/Main';
import ForCompanies from './pages/ForCompanies';
import About from './pages/About';
import Experiences from './pages/Experiences';
import Exp from './pages/Exp';
import Login from './pages/Login';
import AllExperiences from './pages/AllExperiences';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />} path="/" exact />
        <Route element={<ForCompanies />} path="/companies" />
        <Route element={<About />} path="/about" />
        <Route element={<Experiences />} path="/experiences/:byWhere/:id" />
        <Route element={<AllExperiences />} path="/experiences/" exact />
        <Route element={<Exp />} path="/exp/:id" />
        <Route element={<Login />} path="/login" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </BrowserRouter>
  )
}

export default Routing;

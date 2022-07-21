import React from 'react';
import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import CandidatesListPage from './components/CandidatesListPage/CandidatesListPage';
import CandidatePage from './components/CandidatePage/CandidatePage';
import ErrorPage from './components/ErrorPage/ErrorPage';

import Footer from './components/Footer/Footer';

import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";

export const App = () => {

  return (
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={ <LoginPage />}></Route>
          <Route path='/hr-panel' element={ <CandidatesListPage />}></Route>
          <Route path='/success' element={ <CandidatePage />}></Route>
          <Route path='*' element={ <ErrorPage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
  );
}

import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './components/LoginPage/LoginPage';
import CandidatesListPage from './components/CandidatesListPage/CandidatesListPage';
import CandidatePage from './components/CandidatePage/CandidatePage';
import { Panel } from './pages/Panel/Panel';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Footer from './components/Footer/Footer';

import './App.scss';




export const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='hr-panel' element={<CandidatesListPage/>}>
            <Route path={':userId'} element={<CandidatePage/>}/>
            {/* <Route path={'profile'} element={<Profile/>}/> */}
        </Route>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import {Panel} from './pages/Panel/Panel';
import CandidatesListPage from './components/CandidatesListPage/CandidatesListPage';
import CandidatePage from './components/CandidatePage/CandidatePage';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Footer from './components/Footer/Footer';
import {StudentRegisterForm} from "./components/StudentRegisterForm/StudentRegisterForm";
import {
  CheckingBeforeStudentRegistryForm
} from "./components/CheckingBeforeStudentRegistryForm/CheckingBeforeStudentRegistryForm";
import {CV} from "./tymczasowy/CV";
import './App.scss';

export const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/student/register/:id/:token/' element={<CheckingBeforeStudentRegistryForm/>}/>
        <Route path='/student/register/:id/:token/form' element={<StudentRegisterForm/>}/>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/recruiter' element={<CandidatesListPage/>}/>
        <Route path={'/recruiter/cv/:id'} element={<CandidatePage/>}/>

        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

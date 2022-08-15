import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import CandidatesListPage from './components/CandidatesListPage/CandidatesListPage';
import CandidatePage from './components/CandidatePage/CandidatePage';
import AdminPage from 'components/AdminPage/AdminPage';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Footer from './components/Footer/Footer';
import {
  CheckingBeforeStudentRegistryForm
} from './components/CheckingBeforeStudentRegistryForm/CheckingBeforeStudentRegistryForm';
import RedirectPage from './components/RedirectPage/RedirectPage';
import StudentRegisterForm from './components/StudentRegisterForm/StudentRegisterForm';
import RecruiterPasswordForm from './RecruiterPasswordForm/RecruiterPasswordForm';
import {
  CheckingBeforeRecruiterRegistryForm
} from './CheckingBeforeRecruiterRegistryForm/CheckingBeforeRecruiterRegistryForm';

import './App.scss';


export const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/student/register/:id/:token/' element={<CheckingBeforeStudentRegistryForm/>} />
        <Route path='/student/register/:id/:token/form' element={<StudentRegisterForm/>} />
        <Route path='/' element={<LoginPage />} />
        <Route path='/recruiter/register/:recruiterId/:registerToken/' element={<CheckingBeforeRecruiterRegistryForm/>} />
        <Route path='/recruiter/register/:recruiterId/:registerToken/form' element={<RecruiterPasswordForm/>} /> ????
        <Route path='/recruiter/:recruiterId/:numberOfPage' element={<CandidatesListPage/>} />
        <Route path='/recruiter/:recruiterId/cv/:id' element={<CandidatePage/>}/>
        <Route path='/recruiter/:recruiterId' element={<RedirectPage />} />
        <Route path='/student/:id' element={<CandidatePage />}/>
        <Route path='/student/edit/:id' element={<StudentRegisterForm />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}



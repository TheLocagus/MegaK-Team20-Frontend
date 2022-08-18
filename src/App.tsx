import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import RecruiterPasswordForm from './components/RecruiterPasswordForm/RecruiterPasswordForm';
import {
  CheckingBeforeRecruiterRegistryForm
} from './CheckingBeforeRecruiterRegistryForm/CheckingBeforeRecruiterRegistryForm';

import './App.scss';
import {CheckingBeforeUserChangePassword} from "./CheckingBeforeUserChangePassword/CheckingBeforeUserChangePassword";
import PasswordForm from "./components/PasswordForm/PasswordForm";
import GenericSection from "./components/common/GenericSection/GenericSection";


export const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/check-user/:id/:registerToken' element={<CheckingBeforeUserChangePassword/>}/>
        <Route path='/change-password/:id/:registerToken/:role' element={<GenericSection children={<PasswordForm />}/>}/>
        <Route path='/student/:id' element={<CandidatePage />}/>
        <Route path='/student/register/:id/:token/' element={<CheckingBeforeStudentRegistryForm />} />
        <Route path='/student/register/:id/:token/form' element={<StudentRegisterForm />} />
        <Route path='/recruiter/register/:recruiterId/:registerToken/' element={<CheckingBeforeRecruiterRegistryForm />} />
        <Route path='/recruiter/register/:recruiterId/:registerToken/form' element={<RecruiterPasswordForm />} />
        <Route path='/recruiter/:numberOfPage' element={<CandidatesListPage />} />
        <Route path='/recruiter/cv/:id' element={<CandidatePage />}/>
        {/*<Route path='/recruiter/:recruiterId' element={<RedirectPage />} />*/}
        <Route path='/student' element={<CandidatePage />}/>
        <Route path='/student/edit/:id' element={<StudentRegisterForm />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}



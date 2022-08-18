import Header from 'components/Header/Header';
import GenericSection from 'components/common/GenericSection/GenericSection';
import { RecruiterRegisterForm } from 'components/RecruiterRegisterForm/RecruiterRegisterForm';
import labels from 'utils/labels.json'

import './AdminPage.scss';
import React from "react";


const AdminPage: React.FC = () => {


  return (
    <>
      <Header personData='zalogowany admin'/>
      <main className='adminPage'>
        <GenericSection customClass='header'
          children={
            <h2 className='register-recruiter__h2'>{labels.adminPage.header}</h2>
          }
        />
        <GenericSection customClass='register-form' children={<RecruiterRegisterForm  />}/>
      </main>
    </>
  )
}

export default AdminPage;
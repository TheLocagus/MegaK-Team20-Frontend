import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GenericSection from 'components/common/GenericSection/GenericSection';
import Header from 'components/Header/Header';
import Generating from 'components/Generating/Generating';
import labels from 'utils/labels.json'
import { apiUrl } from 'config/api';


const CheckingBeforeUserChangePassword = () => {
  const { id, registerToken } = useParams()

  useEffect(() => {
    (async () => {

      const res = await fetch(`${apiUrl}/auth/check-user/${id}/${registerToken}`, {
        credentials: 'include',
      })
      const data = await res.json();

      if (data.success){
        // window.location.href = `http://localhost:3000/change-password/${id}/${registerToken}/${data.role}`
        window.location.href = `https://megakheadhunters-team20.networkmanager.pl/change-password/${id}/${registerToken}/${data.role}`
      } else {
        throw new Error('Wrong data.')
      }
    })()
  }, [])

  return (
    <>
      <Header personData='' />
      <GenericSection children={<Generating message={labels.waiting} />}/>
    </>
  )
}

export default CheckingBeforeUserChangePassword;
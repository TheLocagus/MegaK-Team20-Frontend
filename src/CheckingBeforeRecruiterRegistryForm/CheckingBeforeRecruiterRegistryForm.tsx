import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GenericSection from 'components/common/GenericSection/GenericSection';
import Header from 'components/Header/Header';
import Generating from 'components/Generating/Generating';
import labels from 'utils/labels.json'



export const CheckingBeforeRecruiterRegistryForm = () => {
  const { recruiterId, registerToken } = useParams()

  useEffect(() => {
    (async () => {


      const res = await fetch(`http://localhost:3001/recruiter/register/${recruiterId}/${registerToken}`, {
        credentials: 'include',
      })
      const data = await res.json();

      if (data.success){
        window.location.href = `http://localhost:3000/recruiter/register/${recruiterId}/${registerToken}/form`
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
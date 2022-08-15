import React, {useEffect} from 'react';
import {labels} from 'utils/labels'

import {useParams} from 'react-router-dom';

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
    <div className='waiting-info'>{labels.waiting}</div>
  )
}
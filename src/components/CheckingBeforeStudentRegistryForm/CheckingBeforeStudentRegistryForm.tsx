import React, {useEffect} from 'react';
import {labels} from 'utils/labels'

import './CheckingBeforeStudentRegistryForm.scss';
import {useParams} from 'react-router-dom';

export const CheckingBeforeStudentRegistryForm = () => {
    const { id, token } = useParams()

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3001/student/register/${id}/${token}`)
            const data = await res.json();

            if (data.isOk){
                window.location.href = `http://localhost:3000/student/register/${id}/${token}/form`
            } else {
                throw new Error('Wrong data.')
            }
        })()
    }, [])

    return (
        <div className='waiting-info'>{labels.waiting}</div>
    )
}
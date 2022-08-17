import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GenericSection from 'components/common/GenericSection/GenericSection';
import Header from 'components/Header/Header';
import Generating from 'components/Generating/Generating';
import labels from 'utils/labels.json'
import {apiUrl} from "../../config/api";


export const CheckingBeforeStudentRegistryForm = () => {
    const { id, token } = useParams()

    useEffect(() => {
        (async () => {
            const res = await fetch(`${apiUrl}/student/register/${id}/${token}`, {
                credentials: 'include',
            })
            const data = await res.json();

            if (data.success){
                window.location.href = `https://megakheadhunters-team20.networkmanager.pl/student/register/${id}/${token}/form`
                // window.location.href = `http://localhost:3000/student/register/${id}/${token}/form`
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
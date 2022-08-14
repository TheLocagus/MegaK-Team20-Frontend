import React from 'react'
import { SyntheticEvent } from 'react';
import { useState } from 'react'
import './RecruiterRegisterForm.scss'


interface CreateRecruiterResponse {
    email: string;
    fullName: string;
    company: string;
    maxReservedStudents: number | string;
}


export const RecruiterRegisterForm = () => {
    
    const [form, setForm] = useState<CreateRecruiterResponse>({
        email: '',
        fullName: '',
        company: '',
        maxReservedStudents: '',
    })
    const [errorMessage, setErrorMessage] = useState<string>('');

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    }

    const sendForm = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        if (form.email.length === 0) {
            setErrorMessage('Podaj email');
            throw new Error('Podaj email');
        }
        if (form.fullName.length === 0) {
            setErrorMessage('Podaj imię i nazwisko');
            throw new Error('Podaj imię i nazwisko');
        }
        if (form.company.length === 0) {
            setErrorMessage('Podaj nazwę firmy');
            throw new Error('Podaj nazwę firmy');
        }
        if (form.maxReservedStudents === 0) {
            setErrorMessage('Podaj max liczbę rezerwacji');
            throw new Error('Podaj max liczbę rezerwacji');
        }

        const res = await fetch('http://localhost:3001/admin/import-recruiters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
        const data = await res.json()

        if (data.message === 'Recruiter saved successfully') setErrorMessage('Dodano poprawnie');

        if(data.message === 'Recruiter modified') setErrorMessage('email jest zajęty')
    }

    return <>
        <img className='register-recruiter__logo' src={require('../../images/logo-mk.png')} alt='' width='124' height='76' />
        <form action="" className="add-recruiter-form" onSubmit={sendForm}>

            <h2 className="register-recruiter__h2">Dodaj HR</h2>

            <input
                className="register-recruiter__input"
                type="email"
                name="login"
                value={form.email}
                placeholder="email"
                onChange={e => updateForm('email', e.target.value)}
            />
            <input
                className="register-recruiter__input"
                type="text"
                name="fullName"
                value={form.fullName}
                placeholder="imię i nazwisko"
                onChange={e => updateForm('fullName', e.target.value)}
            />
            <input
                className="register-recruiter__input"
                type="text"
                name="company"
                value={form.company}
                placeholder="firma"
                onChange={e => updateForm('company', e.target.value)}
            />
            <input
                className="register-recruiter__input"
                type="number"
                name="maxReservedStudents"
                value={form.maxReservedStudents}
                placeholder="max liczba studentów"
                min="0"
                onChange={e => updateForm('maxReservedStudents', Number(e.target.value))}
            />

            <button className="register-recruiter__button">Dodaj</button>

            {
                errorMessage.length > 0 &&
                <div className='register-recruiter__error'>
                    <h2 className="error-message">{errorMessage}</h2>
                </div>
            }

        </form>

    </>
}
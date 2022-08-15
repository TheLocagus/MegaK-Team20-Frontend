import React, { useState, SyntheticEvent } from 'react';
import { labels } from 'utils/labels';

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
            credentials: 'include',
        })
        const data = await res.json()

        if (data.message === 'Recruiter saved successfully') setErrorMessage('Dodano poprawnie');

        if(data.message === 'Recruiter modified') setErrorMessage('email jest zajęty')
    }

    return <>
        <article className='add-recruiter-form'>
            <form action='' onSubmit={sendForm}>
                <h3>{labels.adminPage.addRecruiter}</h3>
                <input
                    className='register-recruiter__input'
                    type='email'
                    name='login'
                    value={form.email}
                    placeholder={labels.form.email}
                    onChange={e => updateForm('email', e.target.value)}
                />
                <input
                    className='register-recruiter__input'
                    type='text'
                    name='fullName'
                    value={form.fullName}
                    placeholder={labels.adminPage.nameSurname}
                    onChange={e => updateForm('fullName', e.target.value)}
                />
                <input
                    className='register-recruiter__input'
                    type='text'
                    name='company'
                    value={form.company}
                    placeholder={labels.adminPage.company}
                    onChange={e => updateForm('company', e.target.value)}
                />
                <input
                    className='register-recruiter__input'
                    type='number'
                    name='maxReservedStudents'
                    value={form.maxReservedStudents}
                    placeholder={labels.adminPage.studentsLimit}
                    min='0'
                    onChange={e => updateForm('maxReservedStudents', Number(e.target.value))}
                />

                <button className='red-btn'>{labels.buttons.add}</button>

                {
                    errorMessage.length > 0 &&
                    <div className='register-recruiter__error'>
                        <h2 className='error-message'>{errorMessage}</h2>
                    </div>
                }

            </form>
        </article>
        <article className='register-input'>
            <form>
                <h3>{labels.adminPage.addStudents}</h3>
                <label className="custom-file-upload">
                    <input type='file'></input>
                </label>
                <button className='submit-btn red-btn' type='submit'>{labels.buttons.send}</button>
            </form>
        </article>
    </>
}
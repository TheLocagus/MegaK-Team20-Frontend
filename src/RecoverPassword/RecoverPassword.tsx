import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import labels from 'utils/labels.json'

import 'components/LoginForm/LoginForm.scss';
import React, {SyntheticEvent, useEffect, useState} from "react";
import {apiUrl} from "../config/api";


const RecoverPassword: React.FC = () => {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState<null | boolean>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [display, setDisplay] = useState<'none' | 'block'>('none')

  useEffect(() => {
    if (message !== '') {
      setMessage('');
    }
    if (isSuccess !== null) {
      setIsSuccess(null)
    }
  }, [email])

  useEffect(() => {
    if (isLoading) {
      setDisplay('block')
    } else {
      setDisplay('none')
    }
  }, [isLoading])

  const handleForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true)
    const res = await fetch(`${apiUrl}/auth/forgot-password`, {
      method: 'POST',
      body: JSON.stringify({email}),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })

    const data = await res.json()

    if (data.success) {
      setIsSuccess(true)
      setIsLoading(false)
      setMessage('Na podany adres email został wysłany link weryfikacyjny.')
    } else {
      setIsSuccess(false)
      setIsLoading(false)
      setMessage('Coś poszło nie tak.')
    }
  }

  return (
    <section className='login-page'>
      <form className='form-login' onSubmit={handleForm}>
        <img className='form-login__logo' src={require('../images/logo-mk.png')} alt='' width='124' height='76'/>
        <h2>{labels.form.resetPassLabel}</h2>
        {
          <div style={{
            color: isSuccess ? 'green' : 'red',
            margin: '10px 0'
          }}>{message.length !== 0 ? message : null} </div>
        }
        <label className='form-login__label'>
          <input className='form-login__input'
                 type='email'
                 id='email'
                 placeholder={labels.form.email}
                 value={email}
                 onChange={e => setEmail(e.target.value)}
          >
          </input>
        </label>

        <div className='form-login__div'>
          <div className='form-login__login'>
            <ButtonLink type='submit'
                        customClass='red-btn'
                        label={labels.buttons.send}
            />
          </div>
        </div>
      </form>
      <div className='waiting-for-data' style={{display: `${display}`}}>
        <h1>Trwa przetwarzanie danych...</h1>
      </div>
    </section>

  )
}

export default RecoverPassword;
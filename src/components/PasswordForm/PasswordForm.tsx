import React, {SyntheticEvent, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import labels from 'utils/labels.json'
import { apiUrl } from 'config/api';

import 'components/LoginForm/LoginForm.scss';


const PasswordForm: React.FC = () => {

  const [pwd, setPwd] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState<null | boolean>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [display, setDisplay] = useState<'none' | 'block'>('none')
  const {id, registerToken, role} = useParams();

  useEffect(() => {
    if (message !== '') {
      setMessage('');
    }
    if (isSuccess !== null) {
      setIsSuccess(null)
    }
  }, [pwd, repeatPassword])

  useEffect(() => {
    if (isLoading) {
      setDisplay('block')
    } else {
      setDisplay('none')
    }
  }, [isLoading])

  const handleForm = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (pwd !== repeatPassword) {
      setMessage('Niepoprawne hasła');
      throw new Error('Niepoprawne hasła');
    }
    setIsLoading(true)

    const res = await fetch(`${apiUrl}/auth/change-password`, {
      method: 'POST',
      body: JSON.stringify({
        pwd,
        id,
        token: registerToken,
        role
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
    const data = await res.json()
    console.log(data)
    if (data.success) {
      setMessage('Hasło zostało zmienione pomyślnie.')
      setIsSuccess(true)
      setIsLoading(false)
    } else {
      setMessage('Coś poszło nie tak.')
      setIsSuccess(false)
      setIsLoading(false)
    }
  }

  return (
    <>
      <form className='form-login' onSubmit={handleForm}>
        <img className='form-login__logo' src={require('../../images/logo-mk.png')} alt='' width='124' height='76'/>
        {
          <div style={{
            color: isSuccess ? 'green' : 'red',
            margin: '10px 0'
          }}>{message.length !== 0 ? message : null} </div>
        }
        <h2>{labels.form.resetPassLabel}</h2>
        <label className='form-login__label'>
          <input className='form-login__input'
                 type='password'
                 id='password'
                 placeholder={labels.form.password}
                 value={pwd}
                 onChange={e => setPwd(e.target.value)}
          >
          </input>
        </label>

        <label className='form-login__label'>
          <input className='form-login__input'
                 type='password'
                 id='password'
                 placeholder={labels.form.repeatPassword}
                 value={repeatPassword}
                 onChange={e => setRepeatPassword(e.target.value)}
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
    </>
  )
}

export default PasswordForm;
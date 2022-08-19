import React, {SyntheticEvent, useEffect, useState} from 'react';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import labels from 'utils/labels.json';
import { apiUrl } from 'config/api';

import './LoginForm.scss';


interface Props {
  onClick?: () => void;
}


const LoginForm: React.FC<Props> = ({onClick}) => {

  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState<null | boolean>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [display, setDisplay] = useState<'none' | 'block'>('none')

  const [loginForm, setLoginForm] = useState({
    email: '',
    pwd: '',
  })

  useEffect(() => {
    if (message !== '') {
      setMessage('');
    }
    if (isSuccess !== null) {
      setIsSuccess(null)
    }
  }, [loginForm.email, loginForm.pwd])

  useEffect(() => {
    if (isLoading) {
      setDisplay('block')
    } else {
      setDisplay('none')
    }
  }, [isLoading])

  const handleChange = (key: string, value: any) => {
    setLoginForm(dataItem => ({
      ...dataItem,
      [key]: value
    }))
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
          email: loginForm.email,
          pwd: loginForm.pwd,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      const data = await res.json()

      if (data.ok) {
        setMessage('Logowanie trwa...')
        setIsSuccess(true)
        setIsLoading(false)
      } else {
        setIsSuccess(false)
        setIsLoading(false)
        setMessage('Niepoprawne dane')
      }


      switch (data.role) {
        case 'admin':
          window.location.href = '/admin'
          break;
        case 'student':
          window.location.href = '/student'
          break;
        case 'recruiter':
          window.location.href = '/recruiter/1'
          break;
      }

    } catch (e) {
      console.log('Problem z logowaniem')
    }

  }

  return (
    <>
      <form className='form-login' onSubmit={handleSubmit}>
        <img className='form-login__logo' src={require('../../images/logo-mk.png')} alt='' width='124' height='76'/>
        {
          <div style={{
            color: isSuccess ? 'green' : 'red',
            margin: '10px 0'
          }}>{message.length !== 0 ? message : null} </div>
        }
        <label className='form-login__label'>
          <input className='form-login__input'
                 type='text'
                 id='email'
                 placeholder={labels.form.email}
                 value={loginForm.email}
                 onChange={e => handleChange('email', e.target.value)}
          >
          </input>
        </label>

        <label className='form-login__label'>
          <input className='form-login__input'
                 type='password'
                 id='password'
                 placeholder={labels.form.password}
                 value={loginForm.pwd}
                 onChange={e => handleChange('pwd', e.target.value)}
          >
          </input>
        </label>

        <div className='form-login__div'>
          <div className='form-login__login'>
            <ButtonLink type='submit'
                        customClass='red-btn'
                        label={labels.buttons.login}
            />
          </div>
          <div className='form-login__forgotten-password'>
            <ButtonLink type='button'
                        label={labels.form.forgottenPassword}
                        onClick={onClick}
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

export default LoginForm;
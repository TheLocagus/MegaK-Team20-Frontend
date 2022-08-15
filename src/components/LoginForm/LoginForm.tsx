import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import {labels} from 'utils/labels'

import './LoginForm.scss';
import {SyntheticEvent, useState} from "react";


interface Props {
  onClick?: () => void;
}


const LoginForm: React.FC<Props> = ({onClick}) => {

  const [loginForm, setLoginForm] = useState({
    email: '',
    pwd: '',
  })

  const handleChange = (key: string, value: any) => {
    setLoginForm(dataItem => ({
      ...dataItem,
      [key]: value
    }))
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: loginForm.email,
          pwd: loginForm.pwd,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include"
      });
      const data = await res.json()
      console.log(data)
      if (!data.ok) {
        console.log(data)
      }

      switch (data.role){
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

    } catch (e){
      console.log(e)
    }

  }

  return (
    <form className='form-login' onSubmit={handleSubmit}>
      <img className='form-login__logo' src={require('../../images/logo-mk.png')} alt='' width='124' height='76'/>
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
  )
}

export default LoginForm;
import React, { SyntheticEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import labels from 'utils/labels.json'

import '../components/LoginForm/LoginForm.scss';
import {apiUrl} from "../config/api";


const RecruiterPasswordForm = () => {

  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const {recruiterId, registerToken} = useParams();

  const handleForm = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (password.length < 6) throw new Error('Hasło powinno być dłuższe niż 5 znaków')
    if (password !== repeatPassword) throw new Error('Podane hasła nie są jednakowe.')

    const res = await fetch(`${apiUrl}/recruiter/register/${recruiterId}/${registerToken}`, {
      method: "PATCH",
      body: JSON.stringify({password}),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })

    const data = await res.json();

    if(data.success){
      window.location.href = `https://megakheadhunters-team20.networkmanager.pl/`
      // window.location.href = `http://localhost:3000`
    }
  }

  return (
    <section className='login-page'>
      <form className='form-login' onSubmit={handleForm}>
          <img className='form-login__logo' src={require('../images/logo-mk.png')} alt='' width='124' height='76' />
          <h2>{labels.form.resetPassLabel}</h2>
          <label className='form-login__label'>
              <input className='form-login__input'
                  type='password'
                  id='password'
                  value={password}
                  placeholder={labels.form.password}
                  onChange={e => setPassword(e.target.value)}
              >
              </input>  
            </label>
                          
            <label className='form-login__label'>
                <input className='form-login__input'
                    type='password'
                    id='password'
                    value={repeatPassword}
                    placeholder={labels.form.repeatPassword}
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
    </section>
  )
}

export default RecruiterPasswordForm;
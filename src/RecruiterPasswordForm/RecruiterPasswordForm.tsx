import React, {SyntheticEvent, useState} from 'react';
import {useParams} from "react-router-dom";

export const RecruiterPasswordForm = () => {

  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const {recruiterId, registerToken} = useParams();

  const handleForm = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (password.length < 6) throw new Error('Hasło powinno być dłuższe niż 5 znaków')
    if (password !== repeatPassword) throw new Error('Podane hasła nie są jednakowe.')

    const res = await fetch(`http://localhost:3001/recruiter/register/${recruiterId}/${registerToken}`, {
      method: "PATCH",
      body: JSON.stringify({password}),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })

    const data = await res.json();

    if(data.success){
      window.location.href = `http://localhost:3000/`
    }
  }

  return (
    <form onSubmit={handleForm}>
      <input type='password' placeholder='Podaj hasło' value={password} onChange={e => setPassword(e.target.value)}/>
      <input type='password' placeholder='Powtórz hasło' value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)}/>
      <button type='submit'>Potwierdź</button>
    </form>
  )
}
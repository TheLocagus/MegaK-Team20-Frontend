import ButtonLink from '../common/ButtonLink/ButtonLink';

import './LoginForm.scss';

// homepage - okno logowania

interface Props {

}


const LoginForm: React.FC<Props> = () => {


    return (
        <form className='form-login'>
            <img className='form-login__logo' src={require('../../images/logo-mk.png')} alt='' width='124' height='76' />
            <label className='form-login__label'>
                <input className='form-login__input'
                    type='text'
                    id='email'
                    placeholder='E-mail'>
                </input>  
            </label>
                          
            <label className='form-login__label'>
                <input className='form-login__input'
                    type='text'
                    id='password'
                    placeholder='Hasło'>
                </input>
            </label>
            
            <div className='form-login__div'>
                <div className='form-login__login'>            
                    <ButtonLink customClass='form-login__button' type='submit' label='Zaloguj się'/> 
                </div>
                <div className='form-login__forgotten-password'>
                    <p>
                        <ButtonLink target='#' label='Zapomniałeś hasła?'/>
                    </p>
                </div>
           </div>
        </form>
    )
}

export default LoginForm;
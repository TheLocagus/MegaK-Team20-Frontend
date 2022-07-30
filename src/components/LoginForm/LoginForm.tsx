import ButtonLink from 'components/common/ButtonLink/ButtonLink';

import { labels } from 'utils/labels'

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
                    placeholder={labels.login.email}>
                </input>  
            </label>
                          
            <label className='form-login__label'>
                <input className='form-login__input'
                    type='text'
                    id='password'
                    placeholder={labels.login.password}>
                </input>
            </label>
            
            <div className='form-login__div'>
                <div className='form-login__login'>
                    <ButtonLink customClass='form-login__button' type='submit' label={labels.buttons.login}/>
                </div>
                <div className='form-login__forgotten-password'>
                    <ButtonLink target='#' label={labels.login.forgottenPassword}/>
                </div>
           </div>
        </form>
    )
}

export default LoginForm;
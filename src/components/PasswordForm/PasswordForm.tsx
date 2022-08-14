import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import { labels } from 'utils/labels'

import 'components/LoginForm/LoginForm.scss';


const PasswordForm: React.FC = () => {


    return (
        <form className='form-login'>
            <img className='form-login__logo' src={require('../../images/logo-mk.png')} alt='' width='124' height='76' />
            <h2>{labels.login.resetPassLabel}</h2>
            <label className='form-login__label'>
                <input className='form-login__input'
                    type='text'
                    id='password'
                    placeholder={labels.login.password}
                >
                </input>  
            </label>
                          
            <label className='form-login__label'>
                <input className='form-login__input'
                    type='text'
                    id='password'
                    placeholder={labels.login.repeatPassword}
                >
                </input>
            </label>
            
            <div className='form-login__div'>
                <div className='form-login__login'>
                    <ButtonLink type='submit'
                        customClass='form-login__button'
                        label={labels.buttons.send}
                    />
                </div>
           </div>
        </form>
    )
}

export default PasswordForm;
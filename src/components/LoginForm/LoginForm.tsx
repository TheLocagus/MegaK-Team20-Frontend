import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import { labels } from 'utils/labels'

import './LoginForm.scss';


interface Props {
    onClick?: () => void;
}


const LoginForm: React.FC<Props> = ({ onClick }) => {


    return (
        <form className='form-login'>
            <img className='form-login__logo' src={require('../../images/logo-mk.png')} alt='' width='124' height='76' />
            <label className='form-login__label'>
                <input className='form-login__input'
                    type='text'
                    id='email'
                    placeholder={labels.form.email}
                >
                </input>  
            </label>
                          
            <label className='form-login__label'>
                <input className='form-login__input'
                    type='text'
                    id='password'
                    placeholder={labels.form.password}
                >
                </input>
            </label>
            
            <div className='form-login__div'>
                <div className='form-login__login'>
                    <ButtonLink type='submit'
                        customClass='form-login__button'
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
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericSection from 'components/common/GenericSection/GenericSection';
import LoginForm from 'components/LoginForm/LoginForm';
import PasswordForm from 'components/PasswordForm/PasswordForm';

import './LoginPage.scss';


const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [forgottenPassState, setForgottenPassState] = useState(false)
    
    useEffect(() => {
        setTimeout(() => {
            navigate('/recruiter', { replace: true })
        }, 5000)
    },[])


    const forgottenPassHandler = () => setForgottenPassState(true)

    
    return (
        <main>
            {forgottenPassState ?
                <GenericSection customClass='login-page'
                    children={<PasswordForm />}
                />
            :
                <GenericSection customClass='login-page'
                    children={<LoginForm onClick={forgottenPassHandler} />}
                />
            }
        </main>
    )
}

export default LoginPage;
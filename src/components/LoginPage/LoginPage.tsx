import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericSection from 'components/common/GenericSection/GenericSection';
import LoginForm from 'components/LoginForm/LoginForm';

import './LoginPage.scss';

//strona logowania


const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        setTimeout(() => {
            navigate('/recruiter', { replace: true })
        }, 5000)
    },[])

    
    return (
        <main>
            <GenericSection children={<LoginForm />} />
        </main>
    )
}

export default LoginPage;
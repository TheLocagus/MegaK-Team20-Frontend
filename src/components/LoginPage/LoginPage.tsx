import GenericSection from '../common/GenericSection/GenericSection';
import LoginForm from '../LoginForm/LoginForm';

import './LoginPage.scss';

//strona logowania


const LoginPage: React.FC = () => {
    

    return (
        <main>
            <GenericSection children={<LoginForm />} />
        </main>
    )
}

export default LoginPage;
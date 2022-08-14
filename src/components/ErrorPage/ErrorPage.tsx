import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericSection from 'components/common/GenericSection/GenericSection';
import { labels } from 'utils/labels';

import './ErrorPage.scss';


const ErrorPage: React.FC = () => {
    const navigate = useNavigate();
    
    // useEffect(() => {
    //     setTimeout(() => {
    //         navigate('/', { replace: true })
    //     }, 3000)
    // },[])


    return (
        <main className='error-page'>
            <GenericSection
                children={
                    <>
                        <img className='form-login__logo' src={require('../../images/logo-mk.png')} alt='' width='124' height='76' />
                        <h1>{labels.errorPageMsg.noPageFound}</h1>
                        <h2>{labels.errorPageMsg.redirect}</h2>
                    </>
                }
            />
        </main>
    )
}

export default ErrorPage;
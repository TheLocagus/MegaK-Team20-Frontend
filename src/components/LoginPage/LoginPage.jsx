import GenericSection from '../common/GenericSection/GenericSection';

import './LoginPage.css';

//strona logowania

interface Props {
    children: React.ReactNode;
    customClass?: string;
}

const LoginPage: React.FC<Props> = ({ children, customClass }) => {
    
    const content: React.ReactNode = <>
        <p>jakiś content strony</p>
    </>

    return (
        <main className={customClass}>
            <GenericSection children={content} />
        </main>
    )
}

export default LoginPage;
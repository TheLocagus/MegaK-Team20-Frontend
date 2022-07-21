import GenericSection from '../common/GenericSection/GenericSection';

import './CandidatePage.scss';

//strona profilu kandydata



const CandidatePage: React.FC = () => {
    
    const content: React.ReactNode = <>
       profil kandydata
    </>

    return (
        <main>
            <GenericSection children={content} />
        </main>
    )
}

export default CandidatePage;
import GenericSection from '../common/GenericSection/GenericSection';

import './CandidatePage.scss';

//strona profilu kandydata

interface Props {
    children: React.ReactNode;
    customClass?: string;
}

const CandidatePage: React.FC<Props> = ({ children, customClass }) => {
    
    const content: React.ReactNode = <>
       profil kandydata
    </>

    return (
        <main className={customClass}>
            <GenericSection children={content} />
        </main>
    )
}

export default CandidatePage;
import GenericSection from '../common/GenericSection/GenericSection';

import './CandidatesListPage.css';

//strona z listą kandydatów 

interface Props {
    children: React.ReactNode;
    customClass?: string;
}

const CandidatesListPage: React.FC<Props> = ({ children, customClass }) => {
    
    const content: React.ReactNode = <>
        lista kandydatów
    </>

    return (
        <main className={customClass}>
            <GenericSection children={content} />
        </main>
    )
}

export default CandidatesListPage;
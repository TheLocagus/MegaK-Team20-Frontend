import GenericSection from '../common/GenericSection/GenericSection';

import './CandidatesListPage.scss';

//strona z listą kandydatów 

// interface Props {
//     children: React.ReactNode;
//     customClass?: string;
// }

const CandidatesListPage: React.FC = () => {
    
    const content: React.ReactNode = <>
        lista kandydatów
    </>

    return (
        <main>
            <GenericSection children={content} />
        </main>
    )
}

export default CandidatesListPage;
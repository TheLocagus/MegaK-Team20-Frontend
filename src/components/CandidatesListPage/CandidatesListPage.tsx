import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import GenericSection from '../common/GenericSection/GenericSection';
import CandidateCard from '../common/CandidateCard/CandidateCard';

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

    const filters: React.ReactNode = <>
        <div className='userlist-header__searchform'>
            <input placeholder='Szukaj'></input>
            <button>Filtrowanie</button>
        </div>
    </>


    return (
        <>
            <Header />
            <main className='userlist'>
                <GenericSection children={<Navigation /> } customClass='navigation' />
                <GenericSection children={filters} customClass='filters'/>
                <GenericSection children={<CandidateCard />} customClass='userList__list'/>
                <GenericSection children={<CandidateCard />} customClass='userList__list'/>
                <GenericSection children={<CandidateCard />} customClass='userList__list'/>
                <GenericSection children={<CandidateCard />} customClass='userList__list'/>
            </main>
        </>
        
    )
}

export default CandidatesListPage;
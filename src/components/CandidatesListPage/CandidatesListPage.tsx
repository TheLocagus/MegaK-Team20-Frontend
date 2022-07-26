import { useSearchParams } from 'react-router-dom';
import Header from 'components/Header/Header';
import Navigation from 'components/Navigation/Navigation';
import GenericSection from 'components/common/GenericSection/GenericSection';
import CandidateCard from 'components/common/CandidateCard/CandidateCard';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import Icon from 'components/Icon/Icon';

import './CandidatesListPage.scss';
import { useEffect, useState } from 'react';

//strona z listą kandydatów 


const CandidatesListPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const candidates = searchParams.get('candidates');

    useEffect(() => {
        setSearchParams({candidates: 'available'})
    }, [])
    
    // const content: React.ReactNode = <>
    //     lista kandydatów
    // </>

    const filters: React.ReactNode = <>
        <div className='userlist-header__searchform'>
            <div>
                <Icon.Search />
                <input placeholder='Szukaj'></input>
            </div>
            <ButtonLink type='button' label='Filtrowanie'/>
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
import { NavLink, Outlet } from 'react-router-dom';
import Navigation from 'components/Navigation/Navigation';
import GenericSection from 'components/common/GenericSection/GenericSection';

import './CandidatePage.scss';

//strona profilu kandydata



const CandidatePage: React.FC = () => {


    
    const content: React.ReactNode = <>
        <nav>
            <NavLink
                to="list"
                className={({ isActive }) =>
                    isActive ? 'active_link' : undefined
                }
            >
                Dostępni kursanci
            </NavLink>
            <NavLink
                to="meetings"
                className={({ isActive }) =>
                    isActive ? 'active_link' : undefined
                }
            >
                Do rozmowy
            </NavLink>
        </nav>
    </>

    return (
        <main className={'candidates'}>
            <GenericSection children={content} />
            
            <Outlet/>
        </main>
    )
}

export default CandidatePage;

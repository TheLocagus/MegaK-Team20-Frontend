import GenericSection from '../common/GenericSection/GenericSection';

import './CandidatePage.scss';
import {NavLink} from "react-router-dom";

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
        </main>
    )
}

export default CandidatePage;
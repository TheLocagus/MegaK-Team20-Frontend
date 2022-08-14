import ButtonLink from '../common/ButtonLink/ButtonLink';
import { useSearchParams } from 'react-router-dom';

import './Navigation.scss';

// top pasek - miejsce na logo i info o zalogowanym użytkowniku


const Navigation: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const candidates = searchParams.get('candidates');


    return (
        <nav className='userlist-header__menu'>
            <ul>
                <li>
                    <ButtonLink type='button'
                        customClass={`menu-btn ${candidates === 'available' && 'active'}`}
                        label='Dostępni kursanci'
                        onClick={() => setSearchParams({candidates: 'available'})}
                    />
                </li>
                <li>
                    <ButtonLink type='button'
                        customClass={`menu-btn ${candidates === 'meetings' && 'active'}`}
                        label='Do rozmowy'
                        onClick={() => setSearchParams({candidates: 'meetings'})}
                    />
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;
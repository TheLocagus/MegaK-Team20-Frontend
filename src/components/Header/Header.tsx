import { useState } from 'react';
import ButtonLink from '../common/ButtonLink/ButtonLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import labels from 'utils/labels.json'

import './Header.scss';

// top pasek - miejsce na logo i info o zalogowanym użytkowniku

interface Props {
    personData: string;
}


const Header: React.FC<Props> = ({ personData }) => {
    const [menuDropdownState, setMenuDropdownState] = useState(false)


    return (
        <header className='header-admin'>
            <nav className='header-admin__nav'>
                <a href='/'>
                    <div className='logo'></div>
                </a>
                <div className={`header-admin__usermenu ${menuDropdownState && 'open'}`}
                    onMouseEnter={() => setMenuDropdownState(true)}
                    onMouseLeave={() => setMenuDropdownState(false)}
                    >
                    <div>
                        <img className='avatar' src={require('../../images/avatar.jpg')} alt='' />
                        <span>{personData}</span>
                        <div className='arrow-down'>          
                            <FontAwesomeIcon icon={faPlay} />
                        </div>
                    </div>
                    <div className='header-admin__usermenu-list'>
                        <ButtonLink label={labels.buttons.logout} />
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;
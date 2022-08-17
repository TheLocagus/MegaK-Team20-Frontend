import { useState } from 'react';
import ButtonLink from '../common/ButtonLink/ButtonLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { labels } from 'utils/labels'

import './Header.scss';

// top pasek - miejsce na logo i info o zalogowanym użytkowniku

interface Props {
    personData: string;
}


const Header: React.FC<Props> = ({ personData }) => {
    const [menuDropdownState, setMenuDropdownState] = useState(false)

    const logout = async () => {
        const res = await fetch('http://localhost:3001/auth/logout', {
            credentials: 'include'
        })
        const data = await res.json()
        if (data.success) {
            localStorage.clear();
            window.location.href = '/'
        }
    }
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
                        <ButtonLink type='button' label={labels.buttons.logout} onClick={logout} />
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;
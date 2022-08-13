import { useState } from 'react';
import ButtonLink from '../common/ButtonLink/ButtonLink';
import { labels } from 'utils/labels'

import './Header.scss';

// top pasek - miejsce na logo i info o zalogowanym użytkowniku

interface Props {

}


const Header: React.FC<Props> = () => {
    const [menuDropdownState, setMenuDropdownState] = useState(false)


    return (
        <header className='header-admin'>
            <nav className='header-admin__nav'>
                <a href='index.html'>
                    <div className='logo'></div>
                </a>
                <div className={`header-admin__usermenu ${menuDropdownState && 'open'}`}
                    onMouseEnter={() => setMenuDropdownState(true)}
                    onMouseLeave={() => setMenuDropdownState(false)}
                    >
                    <div>
                        <img className='avatar' src={require('../../images/avatar.jpg')} alt='' />
                        <span>Mateusz Kowalski</span>
                        <div className='arrow-down'>▼</div>
                    </div>
                    <div className='header-admin__usermenu-list'>
                        <ButtonLink label={labels.buttons.account} />
                        <ButtonLink label={labels.buttons.logout} />
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;
import { useState } from 'react';
import ButtonLink from '../common/ButtonLink/ButtonLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
// import { labels } from 'utils/labels'
import './Header.scss';
import {useLocation} from "react-router-dom";

// top pasek - miejsce na logo i info o zalogowanym użytkowniku

interface Props {
    personData: string;
}


const Header: React.FC<Props> = ({ personData }) => {
    const [menuDropdownState, setMenuDropdownState] = useState(false)
    const {pathname} = useLocation();

    const logout = async () => {
        const res = await fetch('http://localhost:3001/api/auth/logout', {
            credentials: 'include'
        })
        const data = await res.json()
        if (data.success) {
            localStorage.clear();
            window.location.href = '/'
        }
    }

    const logoUrl = () => {
        if (pathname.includes('/student')) {
            return '/student'
        } else if (pathname.includes('/recruiter')) {
            return '/recruiter/1'
        } else if (pathname.includes('/admin')){
            return '/admin'
        } else {
            return '/'
        }
    }
    return (
        <header className='header-admin'>
            <nav className='header-admin__nav'>
                <a href={logoUrl()}>
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
                        {/*<ButtonLink type='button' label={labels.buttons.logout} onClick={logout} />*/}
                        <ButtonLink type='button' label={'Wyloguj'} onClick={logout} />
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;
import ButtonLink from '../common/ButtonLink/ButtonLink';
import './Header.scss';

// top pasek - miejsce na logo i info o zalogowanym użytkowniku

interface Props {

}


const Header: React.FC<Props> = () => {


    return (
        <header className='header-admin'>
            <nav className='header-admin__nav'>
                <a href='index.html'><div className='logo'></div></a>
                <div className='header-admin__usermenu'>
                    <div className='avatar'></div>
                    <ButtonLink type='button' label='Mateusz Kowalski' customClass='arrow-btn' />
                    {/* icon='▼' */}
                </div>
            </nav>
        </header>
    )
}

export default Header;
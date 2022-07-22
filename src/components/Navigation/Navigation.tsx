// import ButtonLink from '../common/ButtonLink/ButtonLink';
import './Navigation.scss';

// top pasek - miejsce na logo i info o zalogowanym użytkowniku

interface Props {

}


const Navigation: React.FC<Props> = () => {


    return (
        <nav className='userlist-header__menu'>
            <ul>
                <li><a className='active' href='#'>Dostępni kursanci</a></li>
                <li><a href='#'>Do rozmowy</a></li>
            </ul>
        </nav>
    )
}

export default Navigation;
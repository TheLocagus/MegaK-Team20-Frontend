import './Header.scss';

// top pasek - miejsce na logo i info o zalogowanym użytkowniku

interface Props {

}


const Header: React.FC<Props> = () => {


    return (
        <header className="header-admin">

            <nav className="header-admin__nav">
                <a href="index.html">
                    <img className="logo" src="/images/logo-mk.png" alt=""/>
                </a>
                <div className="header-admin__usermenu">
                    <img className="avatar" src="/images/avatar.jpg" alt=""/>
                    <p>Mateusz Kowalski</p>
                    <div className="arrow-down">▼</div>
                </div>
            </nav>
        </header>
    )
}

export default Header;
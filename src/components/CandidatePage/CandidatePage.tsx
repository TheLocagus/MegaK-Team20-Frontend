import { NavLink, Outlet } from 'react-router-dom';
import Navigation from 'components/Navigation/Navigation';
import GenericSection from 'components/common/GenericSection/GenericSection';

import './CandidatePage.scss';

//strona profilu kandydata



const CandidatePage: React.FC = () => {



    return (
        <div className="container">

            <header className="header-admin">

                <nav className="header-admin__nav">
                    <a href="index.html">
                        <div className="logo"></div>
                    </a>
                    <div className="header-admin__usermenu">
                        <div className="avatar"></div>
                        <p>Mateusz Kowalski</p>
                        <div className="arrow-down">▼</div>
                    </div>
                </nav>
            </header>

            <main className="main__cv">
                <div className="main__back">
                    <span> ‹ </span><p> Wróć</p>
                </div>
                <div className="main__personalcard">
                    <div className="personalcard__avatar">
                        <img className="personalcard__avatar-center" src="/images/avatar_big.png" alt=""/>
                            <p className="personalcard__avatar-center">Jan Kowalski</p>
                            <p className="personalcard__avatar-center"><a href=""><i
                                className="bi bi-github"></i> jankowalski</a></p>
                            <p className="personalcard__avatar-contactdata"><i className="bi bi-telephone-fill"></i> +48
                                566 072 227</p>
                            <p className="personalcard__avatar-contactdata"><i
                                className="bi bi-envelope-fill"></i> jankowalski@gmail.com</p>
                    </div>
                    <div className="personalcard__about">
                        <h3>O mnie</h3>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae dolorum unde aliquid, eum esse
                            ex consequuntur cum aperiam omnis odit officia cupiditate, perferendis, nisi sunt. Doloribus
                            numquam nesciunt voluptates tempora!</p>
                    </div>
                    <div className="personalcard__buttons">
                        <button>Brak zainteresowania</button>
                        <button>Zatrudniony</button>
                    </div>
                </div>

                <div className="main__personaldata">
                    <h3>Oceny</h3>
                    <table>
                        <thead>
                        <tr>
                            <td>Ocena przejścia kursu</td>
                            <td>Ocena zaangażowania na kursie</td>
                            <td>Ocena kodu w projekcie własnym</td>
                            <td>Ocena w zespole w Scrum</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><span className="scale">5</span>/5 <span className="star"><span>★★★★★</span></span></td>
                            <td><span className="scale">3</span>/5 <span className="star"><span>★★★</span>★★</span></td>
                            <td><span className="scale">4</span>/5 <span className="star"><span>★★★★</span>★</span></td>
                            <td><span className="scale">5</span>/5 <span className="star"><span>★★★★★</span></span></td>
                        </tr>
                        </tbody>
                    </table>


                    <h3>Oczekiwania w stosunku do zatrudnienia</h3>
                    <table>
                        <thead>
                        <tr>
                            <td>Preferowane miejsce pracy</td>
                            <td>Docelowe miasto, gdzie chce pracować kandydat</td>
                            <td>Oczekiwany typ kontraktu</td>
                            <td>Oczekiwane wynagrodzenie netto</td>
                            <td>Zgoda na odbycie bezpłatnych praktyk/stażu na początek</td>
                            <td>Komercyjne doświadczenie w programowaniu</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Biuro</td>
                            <td>Warszawa</td>
                            <td>Umowa o pracę</td>
                            <td>8 000 zł</td>
                            <td>TAK</td>
                            <td>6 miesięcy</td>
                        </tr>
                        </tbody>
                    </table>

                    <h3>Edukacja</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis repudiandae eos iste laudantium
                        dignissimos, corrupti, numquam rem, optio consequuntur atque mollitia itaque eius officia eum
                        temporibus ratione repellat tempore</p>

                    <h3>Kursy</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis repudiandae eos iste laudantium
                        dignissimos, corrupti, numquam rem, optio consequuntur atque mollitia itaque eius officia eum
                        temporibus ratione repellat tempore</p>

                    <h3>Doświadczenie zawodowe</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis repudiandae eos iste laudantium
                        dignissimos, corrupti, numquam rem, optio consequuntur atque mollitia itaque eius officia eum
                        temporibus ratione repellat tempore</p>

                    <h3>Portfolio</h3>
                    <p><img src="paperclip.svg"/><a href="#">https://Loremipsum/dolor/sit/amet</a></p>

                    <h3>Projekt w zespole Scrumowym</h3>
                    <p><img src="paperclip.svg"/><a
                        href="#">https://github.com/Ami777/MegaKursTest/commits?author=Ami777</a></p>
                    <p><img src="paperclip.svg"/><a
                        href="#">https://github.com/Ami777/MegaKursTest/pulls?q=is%3Apr+reviewed-by%3AAmi777</a></p>

                    <h3>Projekt na zaliczenie</h3>
                    <p><img src="paperclip.svg"/><a href="#">https://Loremipsum/dolor/sit/amet</a></p>
                    <p><img src="paperclip.svg"/><a href="#">https://Loremipsum/dolor/sit/amet</a></p>
                </div>


            </main>
        </div>
)
}

export default CandidatePage;

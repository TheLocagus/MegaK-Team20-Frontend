import './CandidateCard.scss';

// element listy kandydatów na liście 'dostępni kursanci' i 'do rozmowy'
// a także (w zależności od miejsca renderowania) pełna karta kandydata - dla slajdu 6

interface Props {

}


const CandidateCard: React.FC<Props> = () => {


    return (
        <li>
            <div className='listElement'>
                <p>Jan K.</p>
                <div className='opener'>
                    <button>Zarezerwuj rozmowę</button>
                    <span className='arrow'>⌄</span>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>Ocena przejścia kursu</td>
                        <td>Ocena aktywności i zaangażowania na kursie</td>
                        <td>Ocena kodu w projekcie własnym</td>
                        <td>Ocena pracy w zespole w Scrum</td>
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
                        <td>5<span> / 5</span></td>
                        <td>3<span> / 5</span></td>
                        <td>4<span> / 5</span></td>
                        <td>5<span> / 5</span></td>
                        <td>Biuro</td>
                        <td>Warszawa</td>
                        <td>Umowa o pracę</td>
                        <td>8 000 zł</td>
                        <td>TAK</td>
                        <td>6 miesięcy</td>
                    </tr>
                </tbody>
            </table>
        </li>
    )
}

export default CandidateCard;
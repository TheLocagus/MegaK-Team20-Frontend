import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import Icon from 'components/Icon/Icon';

import { labels } from 'utils/labels'

import './CandidateCard.scss';

// element listy kandydatów na liście 'dostępni kursanci' i 'do rozmowy'
// a także (w zależności od miejsca renderowania) pełna karta kandydata - dla slajdu 6

interface Props {

}


const CandidateCard: React.FC<Props> = () => {
    const [cartState, setCartState] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const candidates = searchParams.get('candidates');

    const openCardHandler = () => {
        setCartState(!cartState)
    }


    return (
        <li className={cartState ? 'open' : ''}>
            <div className='listElement'>
                {candidates === 'meetings' &&
                    <div className='reservation-info'>
                        <span className='reservation-info__label'>{labels.recruiter.reservation}</span>
                        <span className='reservation-info__date'>11.07.2022 r.</span>
                    </div>
                }
                    <div className='candidate-info'>
                    {candidates === 'meetings' &&
                        <Icon.AvatarDef />
                    }
                        <p>Jan K.</p>
                    </div>
                <div className='group-btns'>
                    {candidates === 'meetings' ? 
                        <>
                            <ButtonLink customClass='opener' label={labels.buttons.showCV} />
                            <ButtonLink customClass='opener' label={labels.buttons.notInterested} />
                            <ButtonLink customClass='opener' label={labels.buttons.hired} />
                        </> 
                        :
                            <ButtonLink customClass='opener' label='Zarezerwuj rozmowę'/>
                    }
                    <ButtonLink type='button' customClass={`opener-btn ${cartState ? 'open' : ''}`} icon={<Icon.ArrowUp />} onClick={openCardHandler} />
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>{labels.options.courseRate}</td>
                        <td>{labels.options.activityRate}</td>
                        <td>{labels.options.codeRate}</td>
                        <td>{labels.options.teamWorkRate}</td>
                        <td>{labels.options.workPlace.label}</td>
                        <td>{labels.options.city}</td>
                        <td>{labels.options.contractType.label}</td>
                        <td>{labels.options.salary.label}</td>
                        <td>{labels.options.internship.label}</td>
                        <td>{labels.options.experience}</td>
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
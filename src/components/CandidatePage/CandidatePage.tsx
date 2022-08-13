import { NavLink, Outlet, useParams } from 'react-router-dom';
import Navigation from 'components/Navigation/Navigation';
import GenericSection from 'components/common/GenericSection/GenericSection';

import { useEffect, useState } from 'react';
import './CandidatePage.scss';
import { RecruiterActionsOfStatusEnum } from 'components/CandidatesListPage/CandidatesListPage';
import {
    showExpectedContractType, showExpectedTypeWork
} from '../../utils/displayCorrectPlainInStudentsLists';
import { useDispatch } from 'react-redux';
import {Generating} from '../Generating/Generating'

//strona profilu kandydata

export interface StudentCvInterface {
    firstName: string;
    lastName: string;
    bio: string;
    githubUsername: string;
    courseCompletion: number;
    courseEngagement: number;
    projectDegree: number;
    teamProjectDegree: number;
    bonusProjectUrls: string[];
    projectUrls: string[];
    portfolioUrls: string[] | null;
    expectedTypeWork: string;
    targetWorkCity: string;
    expectedContractType: string;
    expectedSalary: string | number;
    canTakeApprenticeship: boolean;
    monthsOfCommercialExp: number;
    education: string;
    workExperience: string;
    courses: string;
    email: string;
    telephone: string;
}

const CandidatePage: React.FC = () => {
    const [isGenerated, setIsGenerated] = useState<boolean>(false)
    const [student, setStudent] = useState<StudentCvInterface>({
        bio: '',
        firstName: '',
        courses: '',
        bonusProjectUrls: [],
        expectedContractType: '',
        canTakeApprenticeship: false,
        courseCompletion: 0,
        education: '',
        expectedTypeWork: '',
        githubUsername: '',
        lastName: '',
        portfolioUrls: [],
        workExperience: '',
        telephone: '',
        courseEngagement: 0,
        email: '',
        expectedSalary: 0,
        monthsOfCommercialExp: 0,
        projectDegree: 0,
        projectUrls: [],
        targetWorkCity: '',
        teamProjectDegree: 0,
    })

    const dispatch = useDispatch();

    const {id} = useParams()
    useEffect(()=>{
       (async () => {
           try {
               console.log(id)

               const res = await fetch(`http://localhost:3001/recruiter/cv/${id}`)
               const data = await res.json()
               setStudent(data)
               setIsGenerated(true)
           } catch (e){
               throw new Error('Something went wrong')
           }
       })()
   }, [])

    const generateStars = (value: number, type: string) => {
        switch(type){
            case 'red':{
                let redStars = '';
                for (let i = 0; i < value; i++) {
                    redStars += '★'
                }
                return redStars;
            }
            case 'gray': {
                let grayStars = '';
                for (let i = 0; i < (5 - value); i++) {
                    grayStars += '★'
                }
                return grayStars;
            }
            default: {
                throw new Error('Something went wrong.')
            }
        }

    }

    const handleNoInterested = async () => {
        const res = await fetch(`http://localhost:3001/recruiter/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                status: RecruiterActionsOfStatusEnum.noInterested
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        window.location.href = 'http://localhost:3000/recruiter'
    }

    const handleEmployed = async () => {
        await fetch(`http://localhost:3001/recruiter/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                status: RecruiterActionsOfStatusEnum.employed
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        window.location.href = 'http://localhost:3000/recruiter'
    }

    if (!isGenerated) {
        return <Generating/>
    }

    return (
        <div className='container'>

            <header className='header-admin'>

                <nav className='header-admin__nav'>
                    <a href='/'>
                        <div className='logo'></div>
                    </a>
                    <div className='header-admin__usermenu'>
                        <div className='avatar'></div>
                        <p>Mateusz Kowalski</p>
                        <div className='arrow-down'>▼</div>
                    </div>
                </nav>
            </header>

            <main className='main__cv'>
                <div className='main__back'>

                    <a href='/recruiter'><span> ‹ </span><p>Wróć</p></a>
                </div>
                <div className='main__personalcard'>
                    <div className='personalcard__avatar'>
                        <img className='personalcard__avatar-center' src={student.githubUsername.length !== 0 ? `https://www.github.com/${student.githubUsername}.png` : '/images/avatar_big.png'} alt=''/>
                            <p className='personalcard__avatar-center'>{student.firstName} {student.lastName}</p>
                            <p className='personalcard__avatar-center'><a href=''><i
                                className='bi bi-github'></i>{student.githubUsername}</a></p>
                            <p className='personalcard__avatar-contactdata'><i className='bi bi-telephone-fill'></i>{student.telephone}</p>
                            <p className='personalcard__avatar-contactdata'><i
                                className='bi bi-envelope-fill'></i>{student.email}</p>
                    </div>
                    <div className='personalcard__about'>
                        <h3>O mnie</h3>
                        <p>{student.bio}</p>
                    </div>
                    <div className='personalcard__buttons'>
                        <button onClick={handleNoInterested}>Brak zainteresowania</button>
                        <button onClick={handleEmployed}>Zatrudniony</button>
                    </div>
                </div>

                <div className='main__personaldata'>
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
                            <td><span className='scale'>{student.courseCompletion}</span>/ 5 <span className='star'><span>{generateStars(student.courseCompletion, 'red')}</span>{generateStars(student.courseCompletion, 'gray')}</span></td>
                            <td><span className='scale'>{student.courseEngagement}</span>/ 5 <span className='star'><span>{generateStars(student.courseEngagement, 'red')}</span>{generateStars(student.courseEngagement, 'gray')}</span></td>
                            <td><span className='scale'>{student.projectDegree}</span>/ 5 <span className='star'><span>{generateStars(student.projectDegree, 'red')}</span>{generateStars(student.projectDegree, 'gray')}</span></td>
                            <td><span className='scale'>{student.teamProjectDegree}</span>/ 5 <span className='star'><span>{generateStars(student.teamProjectDegree, 'red')}</span>{generateStars(student.teamProjectDegree, 'gray')}</span></td>
                        </tr>
                        </tbody>
                    </table>


                    <h3>Oczekiwania w stosunku do zatrudnienia</h3>
                    <table>
                        <thead>
                        <tr>
                            <td>Preferowany typ pracy</td>
                            <td>Docelowe miasto, gdzie chce pracować kandydat</td>
                            <td>Oczekiwany typ kontraktu</td>
                            <td>Oczekiwane wynagrodzenie netto</td>
                            <td>Zgoda na odbycie bezpłatnych praktyk/stażu na początek</td>
                            <td>Komercyjne doświadczenie w programowaniu</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{showExpectedTypeWork(student.expectedTypeWork)}</td>
                            <td>{student.targetWorkCity}</td>
                            <td>{showExpectedContractType(student.expectedContractType)}</td>
                            <td>{student.expectedSalary} zł</td>
                            <td>{student.canTakeApprenticeship ? 'Tak' : 'Nie'}</td>
                            <td>{student.monthsOfCommercialExp} miesięcy</td>
                        </tr>
                        </tbody>
                    </table>

                    <h3>Edukacja</h3>
                    <p>{student.education}</p>

                    <h3>Kursy</h3>
                    <p>{student.courses}</p>

                    <h3>Doświadczenie zawodowe</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis repudiandae eos iste laudantium
                        dignissimos, corrupti, numquam rem, optio consequuntur atque mollitia itaque eius officia eum
                        temporibus ratione repellat tempore</p>

                    <h3>Portfolio</h3>

                    {
                        student.portfolioUrls ?
                        student.portfolioUrls.map(url => <p key={url}><img src='../../icons/clip.png'/><a href={url}>{url}</a></p>) :
                          ''
                    }

                    <h3>Projekt w zespole Scrumowym</h3>

                    {
                        student.bonusProjectUrls ?
                          student.bonusProjectUrls.map(url => <p key={url}><img src='../../icons/clip.png'/><a
                            href={url}>{url}</a></p>)
                          : ''
                    }

                    <h3>Projekt na zaliczenie</h3>

                    {
                        student.projectUrls ?
                          student.projectUrls.map(url => <p key={url}><img src={url}/><a href='#'>{url}</a></p>)
                          : ''
                    }
                </div>

            </main>
        </div>
)
}

export default CandidatePage;

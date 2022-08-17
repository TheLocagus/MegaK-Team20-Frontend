import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from 'components/Header/Header';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import Generating from 'components/Generating/Generating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGear, faPaperclip, faPhone } from '@fortawesome/free-solid-svg-icons';
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro';
import { RecruiterActionsOfStatusEnum } from 'components/CandidatesListPage/CandidatesListPage';
import { showExpectedContractType, showExpectedTypeWork} from 'utils/displayCorrectPlainInStudentsLists';
import { ReactComponent as ArrowUp }  from 'icons/arrow-up.svg'
import labels from 'utils/labels.json'


import './CandidatePage.scss';
import {apiUrl} from '../../config/api';


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
  const dispatch = useDispatch();
  const {id} = useParams()
  const {pathname} = useLocation();

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


  useEffect(() => {

    const path = () => {
      if (pathname.includes('/student')) {
        return 'student'
      } else {
        return `recruiter/cv/${id}`
      }
    }
    (async () => {
      try {
        const res = await fetch(`${apiUrl}/${path()}`, {
          credentials: 'include',
        })
        const data: StudentCvInterface = await res.json();

        setStudent(data)
        if (pathname.includes('/student')) {
          localStorage.setItem('full name', `${data.firstName} ${data.lastName}`)
        }
        setIsGenerated(true)
      } catch (e) {
        throw new Error('Something went wrong')
      }
    })()
  }, [])

  const generateStars = (value: number, type: string) => {
    switch (type) {
      case 'red': {
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
    const res = await fetch(`${apiUrl}/recruiter/status/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        status: RecruiterActionsOfStatusEnum.noInterested
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })

    window.location.href = `/recruiter/1`
  }

  const handleEmployed = async () => {
    await fetch(`${apiUrl}/recruiter/status/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        status: RecruiterActionsOfStatusEnum.employed
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
    window.location.href = `/recruiter/1`
  }

  const showUrl = (url: string) => (
    <div key={url}>
      <FontAwesomeIcon icon={faPaperclip}/>
      <a href={url}>{url}</a>
    </div>
  )

  const getUserName = () => {
    if (pathname.includes('student')) {
      return localStorage.getItem('User name') ?? 'Użytkownik'
    } else {
      return localStorage.getItem('full name') ?? 'Rekruter'
    }
  }


  return (
        <>
            <Header personData={localStorage.getItem('full name') ?? 'Rekruter'} />
                <main className={isGenerated ? 'main__cv black' : 'main__cv trans'}>
                {
                isGenerated ?
                <>
                    <div className='main__back'>
                    { pathname.includes('student') ? null :
                        <ButtonLink
                            label={labels.buttons.back} 
                            target={`/recruiter/1`}
                            icon={<ArrowUp />}
                            aria={labels.aria.backToList}
                        />  
                    }
                    </div>
                    <div className='main__personalcard'>
                        { pathname.includes('student') &&
                            <ButtonLink
                                icon={<FontAwesomeIcon icon={faGear} />}
                                target={`/student/edit/${id}`}
                                aria={labels.aria.editProfile}
                            />
                        }
                        <div className='personalcard__avatar'>
                            <img src={student?.githubUsername.length !== 0 ? `https://www.github.com/${student?.githubUsername}.png` : '/images/avatar_big.png'}
                                alt=''
                            />
                            <div>
                              <p className='personalcard__avatar-center'>{student?.firstName} {student?.lastName}</p>
                              <p className='personalcard__avatar-center github'>
                                  <a href={`https://www.github.com/${student?.githubUsername}`} aria-label={labels.aria.githubLink}>
                                      <FontAwesomeIcon icon={brands('github')} />
                                      <span>{student?.githubUsername}</span>
                                  </a>
                              </p>
                              <p className='personalcard__avatar-contactdata'>
                                  <FontAwesomeIcon icon={faPhone} />
                                  <span>{student?.telephone}</span>
                              </p>
                              <p className='personalcard__avatar-contactdata'>
                                  <FontAwesomeIcon icon={faEnvelope} />
                                  <span>{student?.email}</span>
                              </p>
                            </div>
                            
                        </div>
                        <div className='personalcard__about'>
                            <h3>{labels.candidate.aboutMe}</h3>
                            <p>{student.bio}</p>
                        </div>
                        <div className='personalcard__buttons'>
                            <ButtonLink type='button'
                                customClass='red-btn'
                                label={labels.buttons.notInterested}
                                onClick={handleNoInterested}
                            />
                            <ButtonLink type='button'
                                customClass='red-btn'
                                label={labels.buttons.hired}
                                onClick={handleEmployed}
                            />
                        </div>
                    </div>

                    <div className='main__personaldata'>
                        <h3>{labels.candidate.grades}</h3>
                        <div className='main__personaldata--grades-section table'>
                            <div className='thead'>
                                <div className='tr'>
                                    <div className='td'>{labels.options.courseRate}</div>
                                    <div className='td'>{labels.options.activityRate}</div>
                                    <div className='td'>{labels.options.codeRate}</div>
                                    <div className='td'>{labels.options.teamWorkRate}</div>
                                </div>
                            </div>
                            <div className='tbody'>
                            <div className='tr'>
                                <div className='td'>
                                    <span className='scale'>{student?.courseCompletion}</span>/ 5 
                                    <span className='star'>
                                        <span>{generateStars(student?.courseCompletion, 'red')}</span>
                                        {generateStars(student?.courseCompletion, 'gray')}
                                    </span>
                                </div>
                                <div className='td'>
                                    <span className='scale'>{student?.courseEngagement}</span>/ 5 
                                    <span className='star'>
                                        <span>{generateStars(student?.courseEngagement, 'red')}</span>
                                        {generateStars(student?.courseEngagement, 'gray')}
                                    </span>
                                </div>
                                <div className='td'>
                                    <span className='scale'>{student?.projectDegree}</span>/ 5 
                                    <span className='star'>
                                        <span>{generateStars(student?.projectDegree, 'red')}</span>
                                        {generateStars(student?.projectDegree, 'gray')}
                                    </span>
                                </div>
                                <div className='td'>
                                    <span className='scale'>{student?.teamProjectDegree}</span>/ 5 
                                    <span className='star'>
                                        <span>{generateStars(student?.teamProjectDegree, 'red')}</span>
                                        {generateStars(student?.teamProjectDegree, 'gray')}
                                    </span>
                                </div>
                            </div>
                            </div>
                        </div>

                        <h3>{labels.candidate.expectations}</h3>
                        <div className='main__personaldata--expectations-section table'>
                            <div className='thead'>
                                <div className='tr'>
                                    <div className='td'>{labels.options.workPlace.label}</div>
                                    <div className='td'>{labels.options.city}</div>
                                    <div className='td'>{labels.options.contractType.label}</div>
                                    <div className='td'>{labels.options.salary.label}</div>
                                    <div className='td'>{labels.options.internship.label}</div>
                                    <div className='td'>{labels.candidate.experience}</div>
                                </div>
                            </div>
                            <div className='tbody'>
                            <div className='tr'>
                                <div className='td'>{student.expectedTypeWork.length !== 0 && showExpectedTypeWork(student?.expectedTypeWork)}</div>
                                <div className='td'>{student?.targetWorkCity}</div>
                                <div className='td'>{student.expectedContractType.length !== 0 && showExpectedContractType(student?.expectedContractType)}</div>
                                <div className='td'>{student?.expectedSalary} zł</div>
                                <div className='td'>{student?.canTakeApprenticeship ? labels.options.internship.yes : labels.options.internship.no}</div>
                                <div className='td'>{student?.monthsOfCommercialExp} miesięcy</div>
                            </div>
                            </div>
                        </div>

                        <div>
                            <h3>{labels.studentRegister.education}</h3>
                            <p>{student?.education}</p> 
                        </div>
                        
                        <div>
                            <h3>{labels.candidate.courses}</h3>
                            <p>{student?.courses}</p>
                        </div>
                        
                        <div>
                            <h3>{labels.studentRegister.experience}</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis repudiandae eos iste laudantium
                            dignissimos, corrupti, numquam rem, optio consequuntur atque mollitia itaque eius officia eum
                            temporibus ratione repellat tempore</p>
                        </div>
                        
                        <div className='urls-section'>
                            <h3>{labels.candidate.portfolio}</h3>
                            <>{student?.portfolioUrls && student.portfolioUrls.map(url => showUrl(url))}</>
                        </div>
                        
                        <div className='urls-section'>
                            <h3>{labels.candidate.scrumProject}</h3>
                            <>{student.bonusProjectUrls.map(url => showUrl(url))}</>
                        </div>

                        <div className='urls-section'>
                            <h3>{labels.candidate.finalProject}</h3>
                            <>{student?.projectUrls && student.projectUrls.map(url => showUrl(url))}</>
                        </div>

                    </div>
                </>

                :
                <Generating message={labels.generatingProfile} />
                }
            </main>
        </>
    )
}

export default CandidatePage;

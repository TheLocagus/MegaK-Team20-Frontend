import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import { ReactComponent as ArrowUp }  from 'icons/arrow-up.svg'
import { ReactComponent as AvatarDef }  from 'icons/avatar-default.svg'
import TableHeader from 'components/common/TableHeader/TableHeader';
import labels from 'utils/labels.json'
import {
  ForInterviewStudentToListResponseInterface,
  RecruiterActionsOfStatusEnum
} from 'components/CandidatesListPage/CandidatesListPage';
import { showExpectedContractType, showExpectedTypeWork } from 'utils/displayCorrectPlainInStudentsLists';
import { studentsStatusHandler } from 'utils/studentsStatusHandler';
import { handleEndReservation } from 'utils/handleEndReservation';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

import './ForInterviewCard.scss';


interface Props {
  student: ForInterviewStudentToListResponseInterface;
  setActiveStudentsList: any;
  setForInterviewStudentsList: any;
}


export const ForInterviewCard: React.FC<Props> = ({ student, setActiveStudentsList, setForInterviewStudentsList }: Props) => {

  const [cartState, setCartState] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const candidates = searchParams.get('candidates');
  const { numberOfPage, recruiterId } = useParams();
  const { type, actualSearchPhrase } = useSelector((store: RootState) => store.students)

  useEffect(() => {
    setSearchParams({candidates: 'meetings'})
  }, [])

  const {
    id,
    canTakeApprenticeship,
    courseCompletion,
    courseEngagement,
    endOfReservation,
    expectedContractType,
    expectedTypeWork,
    expectedSalary,
    monthsOfCommercialExp,
    projectDegree,
    teamProjectDegree,
    targetWorkCity,
    lastName,
    firstName,
    githubUsername,
  } = student


  const openCardHandler = () => {
    setCartState(!cartState);
  }

  const handleNoInterested = async () => {
    await studentsStatusHandler(RecruiterActionsOfStatusEnum.noInterested, id, setActiveStudentsList, setForInterviewStudentsList, numberOfPage || '1', type, actualSearchPhrase);
  }

  const handleEmployed = async () => {
    await studentsStatusHandler(RecruiterActionsOfStatusEnum.employed, id, setActiveStudentsList, setForInterviewStudentsList, numberOfPage || '1', type, actualSearchPhrase);
  }

  const showCv = async () => {
    // window.location.href = `http://localhost:3000/recruiter/cv/${id}`
    window.location.href = `https://megakheadhunters-team20.networkmanager.pl//recruiter/cv/${id}`
  }

  return (
    <li className={cartState ? 'open' : ''}>
      <div className='listElement meetings'>
        {candidates === 'meetings' &&
            <div className='reservation-info'>
                <span className='reservation-info__label'>{labels.recruiter.reservation}</span>
                <span className='reservation-info__date'>{handleEndReservation(endOfReservation)} r.</span>
            </div>
        }
        <div className='candidate-info'>
          {
            githubUsername.length !== 0 || githubUsername ? <img className='gh-avatar' src={`https://www.github.com/${githubUsername}.png`} alt=''/> : <AvatarDef />
          //  póki co będzie wywalać błąd 404 w consoli jeśli githubUsername nie jest prawdziwy
          }

          <p>{firstName} {lastName}</p>
        </div>
        <div className='group-btns'>
          <>
            <ButtonLink type='button'
              customClass='red-btn'
              label={labels.buttons.showCV}
              onClick={showCv}
            />
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
          </>
          <ButtonLink type='button'
            customClass={`opener-btn ${cartState ? 'open' : ''}`}
            icon={<ArrowUp />}
            onClick={openCardHandler}
          />
        </div>
      </div>
      <div className='table'>
        <TableHeader />
          <div className='tbody'>
          <div className='tr'>
            <div className='td'>{courseCompletion}<span> / 5</span></div>
            <div className='td'>{courseEngagement}<span> / 5</span></div>
            <div className='td'>{projectDegree}<span> / 5</span></div>
            <div className='td'>{teamProjectDegree}<span> / 5</span></div>
            <div className='td'>{showExpectedTypeWork(expectedTypeWork)}</div>
            <div className='td'>{targetWorkCity}</div>
            <div className='td'>{showExpectedContractType(expectedContractType)}</div>
            <div className='td'>{expectedSalary}</div>
            <div className='td'>{canTakeApprenticeship ? labels.options.internship.yes : labels.options.internship.no}</div>
            <div className='td'>{monthsOfCommercialExp}</div>
          </div>
          </div>
      </div>
    </li>
  )
}
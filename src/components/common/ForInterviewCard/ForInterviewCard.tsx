import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import Icon from 'components/Icon/Icon';
import TableHeader from 'components/common/TableHeader/TableHeader';
import { labels } from 'utils/labels'
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
    await studentsStatusHandler(RecruiterActionsOfStatusEnum.noInterested, id, setActiveStudentsList, setForInterviewStudentsList, numberOfPage || '1', type, actualSearchPhrase, recruiterId as string);
  }

  const handleEmployed = async () => {
    await studentsStatusHandler(RecruiterActionsOfStatusEnum.employed, id, setActiveStudentsList, setForInterviewStudentsList, numberOfPage || '1', type, actualSearchPhrase, recruiterId as string);
  }

  const showCv = async () => {
    window.location.href = `http://localhost:3000/recruiter/${recruiterId}/cv/${id}`
  }

  return (
    <li className={cartState ? 'open' : ''}>
      <div className='listElement'>
        {candidates === 'meetings' &&
            <div className='reservation-info'>
                <span className='reservation-info__label'>{labels.recruiter.reservation}</span>
                <span className='reservation-info__date'>{handleEndReservation(endOfReservation)} r.</span>
            </div>
        }
        <div className='candidate-info'>
          {
            githubUsername.length !== 0 || githubUsername ? <img className='gh-avatar' src={`https://www.github.com/${githubUsername}.png`} alt=''/> : <Icon.AvatarDef/>
          //  póki co będzie wywalać błąd 404 w consoli jeśli githubUsername nie jest prawdziwy
          }

          <p>{firstName} {lastName}</p>
        </div>
        <div className='group-btns'>
          <>
            <ButtonLink type='button'
              customClass='opener'
              label={labels.buttons.showCV}
              onClick={showCv}
            />
            <ButtonLink type='button'
              customClass='opener'
              label={labels.buttons.notInterested}
              onClick={handleNoInterested}
            />
            <ButtonLink type='button'
              customClass='opener'
              label={labels.buttons.hired}
              onClick={handleEmployed}
            />
          </>
          <ButtonLink type='button'
            customClass={`opener-btn ${cartState ? 'open' : ''}`}
            icon={<Icon.ArrowUp/>}
            onClick={openCardHandler}
          />
        </div>
      </div>
      <table>
        <TableHeader />
          <tbody>
          <tr>
            <td>{courseCompletion}<span> / 5</span></td>
            <td>{courseEngagement}<span> / 5</span></td>
            <td>{projectDegree}<span> / 5</span></td>
            <td>{teamProjectDegree}<span> / 5</span></td>
            <td>{showExpectedTypeWork(expectedTypeWork)}</td>
            <td>{targetWorkCity}</td>
            <td>{showExpectedContractType(expectedContractType)}</td>
            <td>{expectedSalary}</td>
            <td>{canTakeApprenticeship ? labels.options.internship.yes : labels.options.internship.no}</td>
            <td>{monthsOfCommercialExp}</td>
          </tr>
          </tbody>
      </table>
    </li>
  )
}
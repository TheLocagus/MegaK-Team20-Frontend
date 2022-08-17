import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import { ReactComponent as ArrowUp }  from 'icons/arrow-up.svg'
import TableHeader from 'components/common/TableHeader/TableHeader';
import labels from 'utils/labels.json'
import {
  AvailableStudentToListResponseInterface,
  RecruiterActionsOfStatusEnum
} from 'components/CandidatesListPage/CandidatesListPage';
import { showExpectedContractType, showExpectedTypeWork } from 'utils/displayCorrectPlainInStudentsLists';
import { studentsStatusHandler } from 'utils/studentsStatusHandler';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

import './CandidateCard.scss';

// element listy kandydatów na liście 'dostępni kursanci' i 'do rozmowy'
// a także (w zależności od miejsca renderowania) pełna karta kandydata - dla slajdu 6

interface Props {
  student: AvailableStudentToListResponseInterface;
  setActiveStudentsList: any;
  setForInterviewStudentsList: any;
}

const CandidateCard: React.FC<Props> = ({ student, setActiveStudentsList, setForInterviewStudentsList }: Props) => {
  const [cartState, setCartState] = useState(false);
  const { numberOfPage, recruiterId } = useParams();
  const { type, actualSearchPhrase } = useSelector((store: RootState) => store.students)
  const {
    firstName,
    lastName,
    canTakeApprenticeship,
    expectedContractType,
    expectedTypeWork,
    expectedSalary,
    monthsOfCommercialExp,
    targetWorkCity,
    courseCompletion,
    teamProjectDegree,
    projectDegree,
    courseEngagement,
    id
  } = student

  const openCardHandler = () => {
    setCartState(!cartState)
  }

  const handleReservation = async () => {
    await studentsStatusHandler(RecruiterActionsOfStatusEnum.forInterview, id, setActiveStudentsList, setForInterviewStudentsList, numberOfPage || '1', type, actualSearchPhrase);
  }

  return (
    <li className={cartState ? 'open' : ''}>
      <div className='listElement'>
        <div className='candidate-info'>
          <p>{firstName} {lastName}</p>
        </div>
        <div className='group-btns'>
          <ButtonLink type='button'
            customClass='red-btn'
            label={labels.buttons.reserve}
            onClick={handleReservation}
          />
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
              <div className='td'>{expectedSalary !== 0 ? `${expectedSalary} zł` : labels.options.salary.notSpecify}</div>
              <div className='td'>{canTakeApprenticeship ? labels.options.internship.yes : labels.options.internship.no}</div>
              <div className='td'>{monthsOfCommercialExp}</div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default CandidateCard;
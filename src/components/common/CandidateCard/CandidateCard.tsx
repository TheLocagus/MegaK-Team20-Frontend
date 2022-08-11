import React, {useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import Icon from 'components/Icon/Icon';
import {labels} from 'utils/labels'
import {
  AvailableStudentToListResponseInterface, ForInterviewStudentToListResponseInterface,
  RecruiterActionsOfStatusEnum
} from "../../CandidatesListPage/CandidatesListPage";
import {
  showExpectedContractType, showExpectedTypeWork
} from "../../../utils/displayCorrectPlainInStudentsLists";
import './CandidateCard.scss';
import {updateStudentsLists} from "../../../utils/updateStudentsLists";
import {studentsStatusHandler} from "../../../utils/studentsStatusHandler";
import { useDispatch } from 'react-redux';

// element listy kandydatów na liście 'dostępni kursanci' i 'do rozmowy'
// a także (w zależności od miejsca renderowania) pełna karta kandydata - dla slajdu 6

interface Props {
  student: AvailableStudentToListResponseInterface;
}

const CandidateCard: React.FC<Props> = ({student}: Props) => {
  const [cartState, setCartState] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const candidates = searchParams.get('candidates');

  const dispatch = useDispatch();
  
  const {
    id,
    firstName,
    lastName,
    canTakeApprenticeship,
    courseCompletion,
    courseEngagement,
    expectedContractType,
    expectedTypeWork,
    expectedSalary,
    monthsOfCommercialExp,
    projectDegree,
    teamProjectDegree,
    targetWorkCity,
    status
  } = student

  const openCardHandler = () => {
    setCartState(!cartState)
  }

  const handleReservation = async () => {
    await studentsStatusHandler(RecruiterActionsOfStatusEnum.forInterview, id, dispatch);
  }

  return (
    <li className={cartState ? 'open' : ''}>
      <div className='listElement'>
        <div className='candidate-info'>
          <p>{firstName} {lastName}</p>
        </div>
        <div className='group-btns'>
          <ButtonLink type='button' customClass='opener' label='Zarezerwuj rozmowę' onClick={handleReservation}/>
          <ButtonLink type='button' customClass={`opener-btn ${cartState ? 'open' : ''}`} icon={<Icon.ArrowUp/>}
                      onClick={openCardHandler}/>
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
          <td>{courseCompletion}<span> / 5</span></td>
          <td>{courseEngagement}<span> / 5</span></td>
          <td>{projectDegree}<span> / 5</span></td>
          <td>{teamProjectDegree}<span> / 5</span></td>
          <td>{showExpectedTypeWork(expectedTypeWork)}</td>
          <td>{targetWorkCity}</td>
          <td>{showExpectedContractType(expectedContractType)}</td>
          <td>{expectedSalary !== 0 ? `${expectedSalary} zł` : "Nie podano"}</td>
          <td>{canTakeApprenticeship ? "Tak" : "Nie"}</td>
          <td>{monthsOfCommercialExp}</td>
        </tr>
        </tbody>
      </table>
    </li>
  )
}

export default CandidateCard;
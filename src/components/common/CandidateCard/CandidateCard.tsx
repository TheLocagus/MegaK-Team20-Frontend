import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import Icon from 'components/Icon/Icon';
import {labels} from 'utils/labels'
import {
  AvailableStudentToListResponseInterface,
  RecruiterActionsOfStatusEnum
} from '../../CandidatesListPage/CandidatesListPage';
import {
  showExpectedContractType, showExpectedTypeWork
} from '../../../utils/displayCorrectPlainInStudentsLists';
import './CandidateCard.scss';
import {studentsStatusHandler} from '../../../utils/studentsStatusHandler';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';

// element listy kandydatów na liście 'dostępni kursanci' i 'do rozmowy'
// a także (w zależności od miejsca renderowania) pełna karta kandydata - dla slajdu 6

interface Props {
  student: AvailableStudentToListResponseInterface;
  setActiveStudentsList: any;
  setForInterviewStudentsList: any;
}

const CandidateCard: React.FC<Props> = ({student, setActiveStudentsList, setForInterviewStudentsList}: Props) => {
  const [cartState, setCartState] = useState(false);
  const {numberOfPage} = useParams();
  const {type, actualSearchPhrase} = useSelector((store: RootState) => store.students)
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
            customClass='opener'
            label={labels.buttons.reserve}
            onClick={handleReservation}
          />
          <ButtonLink type='button'
            customClass={`opener-btn ${cartState ? 'open' : ''}`}
            icon={<Icon.ArrowUp/>}
            onClick={openCardHandler}
          />
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
          <td>{expectedSalary !== 0 ? `${expectedSalary} zł` : labels.options.salary.notSpecify}</td>
          <td>{canTakeApprenticeship ? labels.options.internship.yes : labels.options.internship.no}</td>
          <td>{monthsOfCommercialExp}</td>
        </tr>
        </tbody>
      </table>
    </li>
  )
}

export default CandidateCard;
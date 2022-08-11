import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import Icon from 'components/Icon/Icon';

import {labels} from 'utils/labels'
import {
  AvailableStudentToListResponseInterface,
  ForInterviewStudentToListResponseInterface,
  RecruiterActionsOfStatusEnum
} from "../../CandidatesListPage/CandidatesListPage";
import {showExpectedContractType, showExpectedTypeWork} from "../../../utils/displayCorrectPlainInStudentsLists";
import {studentsStatusHandler} from "../../../utils/studentsStatusHandler";
import {handleEndReservation} from "../../../utils/handleEndReservation";
import './ForInterviewCard.scss';
import { useDispatch } from 'react-redux';

interface Props {
  student: ForInterviewStudentToListResponseInterface;
}


export const ForInterviewCard: React.FC<Props> = ({
                                                    student
                                                  }: Props) => {

  const [cartState, setCartState] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const candidates = searchParams.get('candidates');

  const dispatch = useDispatch();

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
    await studentsStatusHandler(RecruiterActionsOfStatusEnum.noInterested, id, dispatch);
  }

  const handleEmployed = async () => {
    await studentsStatusHandler(RecruiterActionsOfStatusEnum.employed, id, dispatch);
  }

  const showCv = async () => {
    window.location.href = `http://localhost:3000/recruiter/cv/${id}`
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
            githubUsername.length !== 0 || githubUsername ? <img className='gh-avatar' src={`https://www.github.com/${githubUsername}.png`} alt=""/> : <Icon.AvatarDef/>
          //  póki co będzie wywalać błąd 404 w consoli jeśli githubUsername nie jest prawdziwy
          }

          <p>{firstName} {lastName}</p>
        </div>
        <div className='group-btns'>
          <>
            <ButtonLink type='button' customClass='opener' label={labels.buttons.showCV} onClick={showCv}/>
            <ButtonLink type='button' customClass='opener' label={labels.buttons.notInterested}
                        onClick={handleNoInterested}/>
            <ButtonLink type='button' customClass='opener' label={labels.buttons.hired} onClick={handleEmployed}/>
          </>

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
          <td>{expectedSalary}</td>
          <td>{canTakeApprenticeship ? "Tak" : "Nie"}</td>
          <td>{monthsOfCommercialExp}</td>
        </tr>
        </tbody>
      </table>
    </li>
  )

}
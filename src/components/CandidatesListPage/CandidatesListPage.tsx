import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import Header from 'components/Header/Header';
import Navigation from 'components/Navigation/Navigation';
import GenericSection from 'components/common/GenericSection/GenericSection';
import CandidateCard from 'components/common/CandidateCard/CandidateCard';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import Icon from 'components/Icon/Icon';
import FiltersModal from 'components/common/FiltersModal/FiltersModal';
import {labels} from 'utils/labels'

import './CandidatesListPage.scss';
import {ForInterviewCard} from "../common/ForInterviewCard/ForInterviewCard";
import {updateStudentsLists} from "../../utils/updateStudentsLists";

//strona z listą kandydatów 


export interface AvailableStudentToListResponseInterface {
  id: string;
  status: string;
  firstName: string;
  lastName: string;
  expectedTypeWork: string;
  targetWorkCity: string;
  expectedContractType: string;
  expectedSalary: number;
  canTakeApprenticeship: boolean;
  monthsOfCommercialExp: number;
  courseCompletion: number;
  courseEngagement: number;
  projectDegree: number;
  teamProjectDegree: number;
}

export interface ForInterviewStudentToListResponseInterface {
  id: string;
  firstName: string;
  lastName: string;
  expectedTypeWork: string;
  targetWorkCity: string;
  expectedContractType: string;
  expectedSalary: number;
  canTakeApprenticeship: boolean;
  monthsOfCommercialExp: number;
  courseCompletion: number;
  courseEngagement: number;
  projectDegree: number;
  teamProjectDegree: number;
  githubUsername: string;
  endOfReservation: Date;
}

export enum RecruiterActionsOfStatusEnum {
  noInterested = 'no-interested',
  forInterview = 'for-interview',
  employed = 'employed',
}


const CandidatesListPage: React.FC = () => {
  const [modalState, setModalState] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const candidates = searchParams.get('candidates');

  const [activeStudentsList, setActiveStudentsList] = useState<AvailableStudentToListResponseInterface[]>([])
  const [forInterviewStudentsList, setForInterviewStudentsList] = useState<ForInterviewStudentToListResponseInterface[]>([])

  const modalHandler = () => {
    setModalState(!modalState)
  }

  useEffect(() => {
    setSearchParams({candidates: 'available'})
  }, [])

  useEffect(() => {

    (async () => {
      await updateStudentsLists(setActiveStudentsList, setForInterviewStudentsList);
    })()

  }, [])

  const filters: React.ReactNode = <>
    <div className='userlist-header__searchform'>
      <div>
        <Icon.Search/>
        <input placeholder={labels.filters.inputPlaceholder}/>
      </div>
      <ButtonLink type='button' label={labels.filters.header} onClick={modalHandler}/>
    </div>
  </>


  return (
    <>
      <Header/>
      <main className='userlist'>
        <GenericSection children={<Navigation/>} customClass='navigation'/>
        <GenericSection children={filters} customClass='filters'/>
        {
          candidates === 'available'
            ? activeStudentsList.map(student => <GenericSection key={student.id}
                                                                children={<CandidateCard
                                                                  student={student}
                                                                  setActiveStudentsList={setActiveStudentsList}
                                                                  setForInterviewStudentsList={setForInterviewStudentsList}
                                                                />}
                                                                customClass='userList__list'/>
            )
            : null
        }
        {
          candidates === 'meetings'
          ? forInterviewStudentsList.map(student => <GenericSection key={student.id}
                                                                  children={<ForInterviewCard
                                                                    student={student}
                                                                    setActiveStudentsList={setActiveStudentsList}
                                                                    setForInterviewStudentsList={setForInterviewStudentsList}
                                                                  />}
                                                                  customClass='userList__list'/>)
            : null
        }
      </main>
      {
        modalState && <FiltersModal onClick={modalHandler}/>
      }
    </>

  )
}

export default CandidatesListPage;
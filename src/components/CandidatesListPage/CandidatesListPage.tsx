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
import {useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { Generating } from 'components/Generating/Generating';

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
  avatarUrl: string;
}

export enum RecruiterActionsOfStatusEnum {
  noInterested = 'no-interested',
  forInterview = 'for-interview',
  employed = 'employed',
}


const CandidatesListPage: React.FC = () => {
  const {activeStudents, forInterviewStudents} = useSelector((store:RootState) => store.students);
  const dispatch = useDispatch();
  const [isGenerated, setIsGenerated] = useState<boolean>(false)
  const [modalState, setModalState] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const candidates = searchParams.get('candidates');

  // const [activeStudentsList, setActiveStudentsList] = useState<AvailableStudentToListResponseInterface[]>([])
  // const [forInterviewStudentsList, setForInterviewStudentsList] = useState<ForInterviewStudentToListResponseInterface[]>([])

  const modalHandler = () => {
    setModalState(!modalState)
  }

  useEffect(() => {
    setSearchParams({candidates: 'available'})
  }, [])

  useEffect(() => {

    (async () => {
      try {
        await updateStudentsLists(dispatch);
        setIsGenerated(true);

      } catch(e){
        throw new Error('Something went wrong.')
      }

    })()

  }, [])

  if(!isGenerated){
    return <Generating/>
  }

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
            ? activeStudents.map(student => <GenericSection key={student.id}
                                                                children={<CandidateCard
                                                                  student={student}
                                                                />}
                                                                customClass='userList__list'/>
            )
            : null
        }
        {
          candidates === 'meetings'
            ? forInterviewStudents.map(student => <GenericSection key={student.id}
                                                                      children={<ForInterviewCard
                                                                        student={student}
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
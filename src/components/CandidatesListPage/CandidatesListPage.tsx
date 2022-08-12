import {useEffect, useState} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
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
import {Generating} from 'components/Generating/Generating';

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
  studentImport: {
    id: string;
    courseCompletion: number;
    courseEngagement: number;
    projectDegree: number;
    teamProjectDegree: number;
  };
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

export interface ActiveStudentsData {
  items: AvailableStudentToListResponseInterface[],
  count: number,
  totalPages: number,
}

export enum RecruiterActionsOfStatusEnum {
  noInterested = 'no-interested',
  forInterview = 'for-interview',
  employed = 'employed',
}


const CandidatesListPage: React.FC = () => {
  const [isGenerated, setIsGenerated] = useState<boolean>(false)
  const [modalState, setModalState] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const candidates = searchParams.get('candidates');
  const {numberOfPage} = useParams()
  const [activeStudentsList, setActiveStudentsList] = useState<ActiveStudentsData>({
    count: 1,
    totalPages: 1,
    items: []
  })
  const [forInterviewStudentsList, setForInterviewStudentsList] = useState<ForInterviewStudentToListResponseInterface[]>([])

  const modalHandler = () => {
    setModalState(!modalState)
  }

  useEffect(() => {
    setSearchParams({candidates: 'available'})
  }, [])

  useEffect(() => {

    (async () => {
      try {
        await updateStudentsLists(setActiveStudentsList, setForInterviewStudentsList, numberOfPage || '1');
        setIsGenerated(true);

      } catch (e) {
        throw new Error('Something went wrong.')
      }

    })()

  }, [])

  const createPageNumbers = (current: string, total: number) => {
    const currentPage = Number(current)
    let valuesToMap: (string | number)[]
    if (total === 1) {
      valuesToMap = [1]
    } else if (total === 2) {
      valuesToMap = [1, 2]
    } else if (total === 3) {
      valuesToMap = [1, 2, 3]
    } else if (total === 4) {
      valuesToMap = [1, 2, 3, 4]
    } else if (total === 5) {
      valuesToMap = [1, 2, 3, 4, 5]
    } else if (total === 6) {
      valuesToMap = [1, 2, 3, 4, 5, 6]
    } else if (total > 6 && currentPage === 1) {
      valuesToMap = [currentPage, 2, '...', total]
    } else if (total > 6 && currentPage === 2) {
      valuesToMap = [1, currentPage, 3, '...', total]
      console.log(valuesToMap)
    } else if (total > 6 && currentPage === 3) {
      valuesToMap = [1, 2, currentPage, 4, '...', total]
    } else if (total > 6 && currentPage + 1 === total) {
      valuesToMap = [1, '...', currentPage - 1, currentPage, total]
    } else if (total > 6 && currentPage === total) {
      valuesToMap = [1, '...', currentPage - 1, total]
    } else {
      let previous = currentPage - 1;
      let next = currentPage + 1;
      valuesToMap = [1, '...', previous, currentPage, next, '...', total]
    }
    return valuesToMap.map((value, i) => {
      if (value === currentPage) {
        return <span key={i} className='active'><a href={`/recruiter/${value}`}>{value}</a></span>
      }
      if (typeof value === 'number') {
        return <span key={i}><a href={`/recruiter/${value}`}>{value}</a></span>
      }
      return <span key={i}>{value}</span>
    })
  }

  if (!isGenerated) {
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
            ? activeStudentsList.items.map(student => <GenericSection key={student.studentImport.id}
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

        {
          candidates === 'available'
            ? <section className='pages'>
              {createPageNumbers(numberOfPage as string, activeStudentsList.totalPages)}
            </section>
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
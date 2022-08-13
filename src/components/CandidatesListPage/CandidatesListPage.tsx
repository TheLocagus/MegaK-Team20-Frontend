import {SyntheticEvent, useEffect, useState} from 'react';
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
import {ForInterviewCard} from '../common/ForInterviewCard/ForInterviewCard';
import {updateStudentsLists} from '../../utils/updateStudentsLists';
import {Generating} from 'components/Generating/Generating';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {DataTypeEnum, setActualSearchPhrase, setDataType} from '../../actions/students';

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
  availableStudents: AvailableStudentToListResponseInterface[],
  count: number,
  totalPages: number,
}

export enum RecruiterActionsOfStatusEnum {
  noInterested = 'no-interested',
  forInterview = 'for-interview',
  employed = 'employed',
}


const CandidatesListPage: React.FC = () => {
  const {type, actualSearchPhrase} = useSelector((store: RootState) => store.students)
  const dispatch = useDispatch();
  const [isGenerated, setIsGenerated] = useState<boolean>(false)
  const [modalState, setModalState] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('')
  const [searchParams, setSearchParams] = useSearchParams();
  const candidates = searchParams.get('candidates');
  const {numberOfPage} = useParams();
  const [numberOfSearchedPage, setNumberOfSearchedPage] = useState<number>(Number(numberOfPage))

  const [activeStudentsList, setActiveStudentsList] = useState<ActiveStudentsData>({
    count: 1,
    totalPages: 1,
    availableStudents: []
  })
  const [forInterviewStudentsList, setForInterviewStudentsList] = useState<ForInterviewStudentToListResponseInterface[]>([])

  const modalHandler = () => {
    setModalState(!modalState)
  }
  console.log(type)
  useEffect(() => {
    setSearchParams({candidates: 'available'})
  }, [])

  useEffect(() => {

    (async () => {
      try {
        switch(type){
          case DataTypeEnum.all:
            console.log('czy wchodzi do alla')
            await updateStudentsLists(setActiveStudentsList, setForInterviewStudentsList, numberOfPage || '1', type, actualSearchPhrase);
            setIsGenerated(true);
            break;
          case DataTypeEnum.filtered:
            //fetch z przefiltrowanymi danymi + trzeba zrobić w reduxie stan dla ustawionych filtrów
            const res = await fetch(`http://localhost:3001/recruiter/${numberOfPage}/filter`)
            setActiveStudentsList(await res.json())
            break;
          case DataTypeEnum.searched:
            const resSearched = await fetch(`http://localhost:3001/recruiter/1/${actualSearchPhrase}`)
            //fetch z wyszukanymi
            console.log('czy wchodzi do searched')
            setActiveStudentsList(await resSearched.json())
            break;
        }

      } catch (e) {
        throw new Error('Something went wrong.')
      }

    })()

  }, [])

  const createPageNumbers = (current: string, total: number) => {
    const currentPage = Number(current)
    let valuesToMap: (string | number)[]
    if (total === 1 || total === 0) {
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
      console.log(numberOfPage)

      if (value === (type === DataTypeEnum.all ? Number(numberOfPage) : numberOfSearchedPage)) {
        return <span key={i} className='active' onClick={() => handleChangePage(Number(type === DataTypeEnum.all ? numberOfPage : numberOfSearchedPage))}>{(type === DataTypeEnum.all ? numberOfPage : numberOfSearchedPage)}</span>
      }
      if (typeof value === 'number') {
        return <span key={i} onClick={() => handleChangePage(value)}>{value}</span>
      }
      return <span key={i}>{value}</span>
    })
  }

  const handleSearchForm = async (e: SyntheticEvent) => {
    e.preventDefault();

    if(searchValue.length !== 0){
      dispatch(setDataType(DataTypeEnum.searched))
      console.log('w handleform', type)
      dispatch(setActualSearchPhrase(searchValue))
      const res = await fetch(`http://localhost:3001/recruiter/1/${searchValue}`)
      const data = await res.json()

      setActiveStudentsList(data)
    } else {
      dispatch(setDataType(DataTypeEnum.all))
      await updateStudentsLists(setActiveStudentsList, setForInterviewStudentsList, numberOfPage || '1', type, actualSearchPhrase)
    }

  }

  const handleChangePage = async (numberOfWantedPage: number) => {
    console.log(type)
    switch(type){
      case DataTypeEnum.all:
        window.location.href = `/recruiter/${numberOfWantedPage}`
        break;

      case DataTypeEnum.searched:
        const resSearched = await fetch(`http://localhost:3001/recruiter/${numberOfWantedPage}/${actualSearchPhrase}`)
        setNumberOfSearchedPage(numberOfWantedPage)
        setActiveStudentsList(await resSearched.json())
        break;
    }
  }

  const filters: React.ReactNode = <>
    <div className='userlist-header__searchform'>
      <div>
        <Icon.Search/>
        <form onSubmit={handleSearchForm}>
          <input
            placeholder={labels.filters.inputPlaceholder}
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </form>
      </div>
      <ButtonLink type='submit' label={labels.filters.header} onClick={modalHandler}/>
    </div>
  </>


  return (
    <>
      <Header/>
      <main className='userlist'>
        <GenericSection children={<Navigation />} customClass='navigation' />
        <GenericSection children={filters} customClass='filters' />
        {!isGenerated && <GenericSection children={<Generating />} />}
        {
          candidates === 'available'
            && activeStudentsList?.availableStudents?.map(student =>
              <GenericSection key={student.id} customClass='userList__list'
                children={<CandidateCard
                  student={student}
                  setActiveStudentsList={setActiveStudentsList}
                  setForInterviewStudentsList={setForInterviewStudentsList}
                  />
                }
              />
            )
        }
        {
          candidates === 'meetings'
            && forInterviewStudentsList?.map(student =>
              <GenericSection key={student.id} customClass='userList__list'
                children={<ForInterviewCard
                  student={student}
                  setActiveStudentsList={setActiveStudentsList}
                  setForInterviewStudentsList={setForInterviewStudentsList}
                  />
                }
              />
            )
        }
        {
          candidates === 'available'
            && <GenericSection children={createPageNumbers(numberOfPage as string, activeStudentsList.totalPages)} customClass='pages'/>
        }
      </main>
      {modalState && <FiltersModal onClick={modalHandler}/>}
    </>

  )
}

export default CandidatesListPage;
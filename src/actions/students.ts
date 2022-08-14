import { StudentsAction } from "action-types/students";
import { ForInterviewStudentToListResponseInterface } from "components/CandidatesListPage/CandidatesListPage";
import {StudentsState} from "../reducers/students-reducers";
import {FilterInterface} from "../components/common/FiltersModal/FiltersModal";

export enum DataTypeEnum {
  all = 'all',
  searched = "searched",
  filtered = 'filtered'
}

export const setActiveStudents = (activeStudents: StudentsState["activeStudents"]) => ({
  type: StudentsAction.SET_ACTIVE_STUDENTS,
  payload: activeStudents,
})

export const setForInterviewStudents = (forInterviewStudents: ForInterviewStudentToListResponseInterface[]) => ({
  type: StudentsAction.SET_FOR_INTERVIEW_STUDENTS,
  payload: forInterviewStudents,
})

export const setDataType = (type: DataTypeEnum) => ({
  type: StudentsAction.SET_DATA_TYPE,
  payload: type,
})

export const setActualSearchPhrase = (phrase: string) => ({
  type: StudentsAction.SET_ACTUAL_SEARCH_PHRASE,
  payload: phrase,
})

export const setSavedFilters = (filters: FilterInterface) => ({
  type: StudentsAction.SET_SAVED_FILTERS,
  payload: filters,
})
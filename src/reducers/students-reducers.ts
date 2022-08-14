import { StudentsAction } from "action-types/students";
import { AvailableStudentToListResponseInterface, ForInterviewStudentToListResponseInterface } from "components/CandidatesListPage/CandidatesListPage";
import {DataTypeEnum} from "../actions/students";
import {FilterInterface} from "../components/common/FiltersModal/FiltersModal";

export interface StudentsState {
  activeStudents: {
    count: number;
    availableStudents: AvailableStudentToListResponseInterface[];
    totalPages: Number;
  };
  forInterviewStudents: ForInterviewStudentToListResponseInterface[];
  type: DataTypeEnum;
  actualSearchPhrase: string;
  savedFilters: FilterInterface;
}

const initialState: StudentsState = {
  activeStudents: {
    count: 1,
    availableStudents: [],
    totalPages: 1,
  },
  forInterviewStudents: [],
  type: DataTypeEnum.all,
  actualSearchPhrase: '',
  savedFilters: {
    courseRate: [],
    activityRate: [],
    codeRate: [],
    teamWorkRate: [],
    workPlace: [],
    contractType: [],
    salary: [0],
    internship: null,
    experience: '',
  }
}

interface SetActiveStudents {
  type: StudentsAction.SET_ACTIVE_STUDENTS;
  payload: StudentsState["activeStudents"];
}

interface SetForInterviewStudents {
  type: StudentsAction.SET_FOR_INTERVIEW_STUDENTS;
  payload: ForInterviewStudentToListResponseInterface[];
}

interface SetDataType {
  type: StudentsAction.SET_DATA_TYPE;
  payload: DataTypeEnum;
}

interface SetActualSearchPhrase {
  type: StudentsAction.SET_ACTUAL_SEARCH_PHRASE;
  payload: string;
}

interface SetSavedFilters {
  type: StudentsAction.SET_SAVED_FILTERS;
  payload: FilterInterface;
}

type Action = SetActiveStudents | SetForInterviewStudents | SetDataType | SetActualSearchPhrase | SetSavedFilters;

export default (state: StudentsState = initialState, action: Action) => {
  switch(action.type){
    case StudentsAction.SET_ACTIVE_STUDENTS: {
      return {
        ...state,
        activeStudents: action.payload,
      }
    }
    case StudentsAction.SET_FOR_INTERVIEW_STUDENTS: {
      return {
        ...state,
        forInterviewStudents: action.payload,
      }
    }
    case StudentsAction.SET_DATA_TYPE: {
      return {
        ...state,
        type: action.payload,
      }
    }
    case StudentsAction.SET_ACTUAL_SEARCH_PHRASE: {
      return {
        ...state,
        actualSearchPhrase: action.payload,
      }
    }
    case StudentsAction.SET_SAVED_FILTERS: {
      return {
        ...state,
        savedFilters: action.payload,
      }
    }
    default: return state;
  }
}